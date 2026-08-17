package com.cms.employeemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cms.employeemanagement.entity.Holiday;
import com.cms.employeemanagement.service.HolidayService;

@RestController
@RequestMapping("/api/holidays")
@CrossOrigin(origins = "*")
public class HolidayController {

    @Autowired
    private HolidayService holidayService;

    // Add Holiday
    @PostMapping
    public Holiday addHoliday(@RequestBody Holiday holiday) {

        return holidayService.addHoliday(holiday);

    }

    // Get All Holidays
    @GetMapping
    public List<Holiday> getAllHolidays() {

        return holidayService.getAllHolidays();

    }

    // Get Upcoming Holidays
    @GetMapping("/upcoming")
    public List<Holiday> getUpcomingHolidays() {

        return holidayService.getUpcomingHolidays();

    }

    // Get Holiday By Id
    @GetMapping("/{id}")
    public Holiday getHolidayById(@PathVariable Long id) {

        return holidayService.getHolidayById(id);

    }

    // Update Holiday
    @PutMapping("/{id}")
    public Holiday updateHoliday(
            @PathVariable Long id,
            @RequestBody Holiday holiday) {

        return holidayService.updateHoliday(id, holiday);

    }

    // Delete Holiday
    @DeleteMapping("/{id}")
    public void deleteHoliday(@PathVariable Long id) {

        holidayService.deleteHoliday(id);

    }

}