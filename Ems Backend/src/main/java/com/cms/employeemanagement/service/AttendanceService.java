package com.cms.employeemanagement.service;

import java.util.List;

import com.cms.employeemanagement.dto.AttendanceDto;

public interface AttendanceService {

    AttendanceDto checkIn(String employeeEmail);

    AttendanceDto checkOut(String employeeEmail);

    AttendanceDto getTodayAttendance(String employeeEmail);

    List<AttendanceDto> getAttendanceHistory(String employeeEmail);
 
    List<AttendanceDto> getAllAttendance();
    
    List<AttendanceDto> getAttendanceForAllEmployeesByDate(String date);

    AttendanceDto getAttendanceByDate(String employeeEmail, String date);
}