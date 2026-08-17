package com.cms.employeemanagement.service.impl;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.employeemanagement.dto.AttendanceDto;
import com.cms.employeemanagement.entity.Attendance;
import com.cms.employeemanagement.entity.AttendanceStatus;
import com.cms.employeemanagement.entity.Employee;
import com.cms.employeemanagement.repository.AttendanceRepository;
import com.cms.employeemanagement.repository.EmployeeRepository;
import com.cms.employeemanagement.service.AttendanceService;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private static final Logger logger =
            LoggerFactory.getLogger(AttendanceServiceImpl.class);

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;


    
    @Override
    public AttendanceDto checkIn(String employeeEmail) {

        logger.info(
                "Check-in attempt for employee: {}",
                employeeEmail
        );

        Employee employee =
                employeeRepository
                        .findByEmail(employeeEmail)
                        .orElseThrow(() -> {

                            logger.warn(
                                    "Check-in failed - employee not found: {}",
                                    employeeEmail
                            );

                            return new RuntimeException(
                                    "Employee not found"
                            );
                        });

        LocalDate today = LocalDate.now();

        Optional<Attendance> existingAttendance =
                attendanceRepository
                        .findByEmployeeEmailAndDate(
                                employeeEmail,
                                today
                        );

        if (existingAttendance.isPresent()) {

            logger.warn(
                    "Duplicate check-in attempt for employee: {}",
                    employeeEmail
            );

            throw new RuntimeException(
                    "You have already checked in today."
            );
        }

        Attendance attendance =
                new Attendance();

        attendance.setEmployeeId(
                employee.getId()
        );

        attendance.setEmployeeName(
                employee.getName()
        );

        attendance.setEmployeeEmail(
                employee.getEmail()
        );

        attendance.setDate(
                today
        );

        attendance.setCheckInTime(
                LocalDateTime.now()
        );

        attendance.setStatus(
                AttendanceStatus.PRESENT
        );

        Attendance savedAttendance =
                attendanceRepository.save(
                        attendance
                );

        logger.info(
                "Employee checked in successfully: {} ({})",
                employee.getName(),
                employeeEmail
        );

        return convertToDto(
                savedAttendance
        );
    }



    @Override
    public AttendanceDto checkOut(String employeeEmail) {

        logger.info(
                "Check-out attempt for employee: {}",
                employeeEmail
        );

        LocalDate today =
                LocalDate.now();

        // Find today's attendance
        Attendance attendance =
                attendanceRepository
                        .findByEmployeeEmailAndDate(
                                employeeEmail,
                                today
                        )
                        .orElseThrow(() -> {

                            logger.warn(
                                    "Check-out failed - employee has not checked in: {}",
                                    employeeEmail
                            );

                            return new RuntimeException(
                                    "Please check in first."
                            );
                        });

        if (attendance.getCheckOutTime() != null) {

            logger.warn(
                    "Duplicate check-out attempt for employee: {}",
                    employeeEmail
            );

            throw new RuntimeException(
                    "You have already checked out today."
            );
        }

        LocalDateTime checkOutTime =
                LocalDateTime.now();

        attendance.setCheckOutTime(
                checkOutTime
        );

        Duration duration =
                Duration.between(
                        attendance.getCheckInTime(),
                        checkOutTime
                );

        attendance.setWorkingHours(
                duration.toMinutes()
        );

        Attendance updatedAttendance =
                attendanceRepository.save(
                        attendance
                );

        logger.info(
                "Employee checked out successfully: {}. Working minutes: {}",
                employeeEmail,
                duration.toMinutes()
        );

        return convertToDto(
                updatedAttendance
        );
    }




    @Override
    public AttendanceDto getTodayAttendance(
            String employeeEmail) {

        logger.info(
                "Fetching today's attendance for employee: {}",
                employeeEmail
        );

        LocalDate today =
                LocalDate.now();

        Optional<Attendance> optionalAttendance =
                attendanceRepository
                        .findByEmployeeEmailAndDate(
                                employeeEmail,
                                today
                        );



        if (!optionalAttendance.isPresent()) {

            logger.info(
                    "No attendance record found for today: {}",
                    employeeEmail
            );

          

            return null;
        }

        
        Attendance attendance =
                optionalAttendance.get();

        logger.info(
                "Today's attendance found for {} with status: {}",
                employeeEmail,
                attendance.getStatus()
        );

        return convertToDto(
                attendance
        );
    }


  
    @Override
    public List<AttendanceDto> getAttendanceHistory(
            String employeeEmail) {

        logger.info(
                "Fetching attendance history for employee: {}",
                employeeEmail
        );

        List<Attendance> attendanceList =
                attendanceRepository
                        .findByEmployeeEmailOrderByDateDesc(
                                employeeEmail
                        );

        logger.info(
                "Attendance history records found for {}: {}",
                employeeEmail,
                attendanceList.size()
        );

        return attendanceList
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }




    @Override
    public List<AttendanceDto> getAllAttendance() {

        logger.info(
                "Fetching all attendance records"
        );

        List<Attendance> attendanceList =
                attendanceRepository
                        .findAllByOrderByDateDesc();

        logger.info(
                "Total attendance records found: {}",
                attendanceList.size()
        );

        return attendanceList
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }



    @Override
    public AttendanceDto getAttendanceByDate(
            String employeeEmail,
            String date) {

        logger.info(
                "Fetching attendance for employee: {} on date: {}",
                employeeEmail,
                date
        );

        LocalDate attendanceDate;

        try {

            attendanceDate =
                    LocalDate.parse(date);

        } catch (Exception e) {

            logger.warn(
                    "Invalid attendance date: {}",
                    date
            );

            throw new RuntimeException(
                    "Invalid date format. Use yyyy-MM-dd."
            );
        }

        Optional<Attendance> optionalAttendance =
                attendanceRepository
                        .findByEmployeeEmailAndDate(
                                employeeEmail,
                                attendanceDate
                        );



        if (!optionalAttendance.isPresent()) {

            logger.info(
                    "No attendance found for {} on {}",
                    employeeEmail,
                    date
            );

           

            AttendanceDto dto =
                    new AttendanceDto();

            dto.setId(null);

            Optional<Employee> optionalEmployee =
                    employeeRepository
                            .findByEmail(employeeEmail);

            if (optionalEmployee.isPresent()) {

                Employee employee =
                        optionalEmployee.get();

                dto.setEmployeeId(
                        employee.getId()
                );

                dto.setEmployeeName(
                        employee.getName()
                );

                dto.setEmployeeEmail(
                        employee.getEmail()
                );
            } else {

                dto.setEmployeeEmail(
                        employeeEmail
                );
            }

            dto.setDate(
                    attendanceDate
            );

            dto.setCheckInTime(
                    null
            );

            dto.setCheckOutTime(
                    null
            );

            dto.setWorkingHours(
                    "-"
            );

            dto.setStatus(
                    AttendanceStatus.ABSENT
            );

            return dto;
        }

     
        Attendance attendance =
                optionalAttendance.get();

        return convertToDto(
                attendance
        );
    }


   
    @Override
    public List<AttendanceDto> getAttendanceForAllEmployeesByDate(
            String date) {

        logger.info(
                "Fetching attendance for all employees on date: {}",
                date
        );

        LocalDate attendanceDate;

        try {

            attendanceDate =
                    LocalDate.parse(date);

        } catch (Exception e) {

            logger.warn(
                    "Invalid attendance date: {}",
                    date
            );

            throw new RuntimeException(
                    "Invalid date format. Use yyyy-MM-dd."
            );
        }

        List<Employee> employees =
                employeeRepository.findAll();

        logger.info(
                "Total employees found: {}",
                employees.size()
        );

        List<Attendance> attendanceList =
                attendanceRepository.findByDate(
                        attendanceDate
                );

        logger.info(
                "Existing attendance records for {}: {}",
                date,
                attendanceList.size()
        );

       

        List<AttendanceDto> result =
                employees
                        .stream()
                        .map(employee -> {

                            Optional<Attendance> attendanceOptional =
                                    attendanceList
                                            .stream()
                                            .filter(attendance ->
                                                    attendance
                                                            .getEmployeeEmail()
                                                            .equalsIgnoreCase(
                                                                    employee.getEmail()
                                                            )
                                            )
                                            .findFirst();

                          

                            if (attendanceOptional.isPresent()) {

                                Attendance attendance =
                                        attendanceOptional.get();

                                logger.debug(
                                        "Attendance found for {}: {}",
                                        employee.getEmail(),
                                        attendance.getStatus()
                                );

                                return convertToDto(
                                        attendance
                                );
                            }

                        
                            logger.debug(
                                    "No attendance found for {}. Displaying ABSENT.",
                                    employee.getEmail()
                            );

                            AttendanceDto dto =
                                    new AttendanceDto();

                            dto.setId(null);

                            dto.setEmployeeId(
                                    employee.getId()
                            );

                            dto.setEmployeeName(
                                    employee.getName()
                            );

                            dto.setEmployeeEmail(
                                    employee.getEmail()
                            );

                            dto.setDate(
                                    attendanceDate
                            );

                            dto.setCheckInTime(
                                    null
                            );

                            dto.setCheckOutTime(
                                    null
                            );

                            dto.setWorkingHours(
                                    "-"
                            );

                            dto.setStatus(
                                    AttendanceStatus.ABSENT
                            );

                            return dto;

                        })
                        .collect(Collectors.toList());

        logger.info(
                "Attendance management result generated for {}. Total employees: {}",
                date,
                result.size()
        );

        return result;
    }



    private AttendanceDto convertToDto(
            Attendance attendance) {

        AttendanceDto dto =
                new AttendanceDto();

        dto.setId(
                attendance.getId()
        );

        dto.setEmployeeId(
                attendance.getEmployeeId()
        );

        dto.setEmployeeName(
                attendance.getEmployeeName()
        );

        dto.setEmployeeEmail(
                attendance.getEmployeeEmail()
        );

        dto.setDate(
                attendance.getDate()
        );

        dto.setCheckInTime(
                attendance.getCheckInTime()
        );

        dto.setCheckOutTime(
                attendance.getCheckOutTime()
        );

        dto.setWorkingHours(
                attendance.getFormattedWorkingHours()
        );

        dto.setStatus(
                attendance.getStatus()
        );

        return dto;
    }
}