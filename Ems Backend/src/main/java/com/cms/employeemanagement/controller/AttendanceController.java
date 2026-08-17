package com.cms.employeemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cms.employeemanagement.dto.AttendanceDto;
import com.cms.employeemanagement.service.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Employee Check In
    @PostMapping("/checkin/{email}")
    public AttendanceDto checkIn(@PathVariable String email) {
        return attendanceService.checkIn(email);
    }

    // Employee Check Out
    @PutMapping("/checkout/{email}")
    public AttendanceDto checkOut(@PathVariable String email) {
        return attendanceService.checkOut(email);
    }

    // Today's Attendance
    @GetMapping("/today/{email}")
    public AttendanceDto getTodayAttendance(@PathVariable String email) {
        return attendanceService.getTodayAttendance(email);
    }

    // Employee Attendance History
    @GetMapping("/history/{email}")
    public List<AttendanceDto> getAttendanceHistory(@PathVariable String email) {
        return attendanceService.getAttendanceHistory(email);
    }

    // Admin/HR - View All Attendance
    @GetMapping
    public List<AttendanceDto> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
    @GetMapping("/date/{email}/{date}")
    public AttendanceDto getAttendanceByDate(
            @PathVariable String email,
            @PathVariable String date) {

        return attendanceService.getAttendanceByDate(email, date);

    }
    @GetMapping("/management/{date}")
    public List<AttendanceDto> getAttendanceForAllEmployeesByDate(
            @PathVariable String date) {

        return attendanceService
                .getAttendanceForAllEmployeesByDate(date);
    }

}