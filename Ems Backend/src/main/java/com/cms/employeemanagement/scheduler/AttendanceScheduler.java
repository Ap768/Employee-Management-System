package com.cms.employeemanagement.scheduler;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cms.employeemanagement.entity.Attendance;
import com.cms.employeemanagement.entity.AttendanceStatus;
import com.cms.employeemanagement.entity.Employee;
import com.cms.employeemanagement.entity.User;
import com.cms.employeemanagement.repository.AttendanceRepository;
import com.cms.employeemanagement.repository.EmployeeRepository;
import com.cms.employeemanagement.repository.UserRepository;

@Component
public class AttendanceScheduler {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

  
    @Scheduled(cron = "0 5 0 * * *")
    public void markAbsentEmployees() {

        LocalDate yesterday = LocalDate.now().minusDays(1);

        System.out.println("--------------------------------");
        System.out.println("Attendance Scheduler Started");
        System.out.println("Checking date: " + yesterday);

        DayOfWeek dayOfWeek = yesterday.getDayOfWeek();

        if (dayOfWeek == DayOfWeek.SATURDAY ||
            dayOfWeek == DayOfWeek.SUNDAY) {

            System.out.println(
                    yesterday + " is a weekly off."
            );

            return;
        }

        List<Employee> employees =
                employeeRepository.findAll();

        System.out.println(
                "Total employees found: "
                + employees.size()
        );

       
        for (Employee employee : employees) {

            String email = employee.getEmail();

            System.out.println(
                    "Checking employee: "
                    + employee.getName()
                    + " | "
                    + email
            );

            
            Optional<User> optionalUser =
                    userRepository.findByEmail(email);

            
            if (!optionalUser.isPresent()) {

                System.out.println(
                        "User account not found. Skipping: "
                        + email
                );

                continue;
            }

            User user = optionalUser.get();

            
            if (Boolean.FALSE.equals(user.getActive())) {

                System.out.println(
                        "Employee is inactive. Skipping: "
                        + email
                );

                continue;
            }

           
            boolean attendanceExists =
                    attendanceRepository
                            .findByEmployeeEmailAndDate(
                                    email,
                                    yesterday
                            )
                            .isPresent();

            
            if (attendanceExists) {

                System.out.println(
                        "Attendance already exists for: "
                        + email
                );

                continue;
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

            attendance.setDate(yesterday);

            attendance.setCheckInTime(null);

            attendance.setCheckOutTime(null);

            attendance.setWorkingHours(null);

            attendance.setStatus(
                    AttendanceStatus.ABSENT
            );

            attendanceRepository.save(attendance);

            System.out.println(
                    "ABSENT CREATED FOR: "
                    + employee.getName()
            );
        }

        System.out.println(
                "Attendance Scheduler Completed"
        );

        System.out.println("--------------------------------");
    }
}