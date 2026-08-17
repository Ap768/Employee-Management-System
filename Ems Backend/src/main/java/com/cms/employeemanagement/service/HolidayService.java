package com.cms.employeemanagement.service;

import java.util.List;

import com.cms.employeemanagement.entity.Holiday;

public interface HolidayService {

    Holiday addHoliday(Holiday holiday);

    Holiday updateHoliday(Long id, Holiday holiday);

    void deleteHoliday(Long id);

    List<Holiday> getAllHolidays();

    List<Holiday> getUpcomingHolidays();

    Holiday getHolidayById(Long id);

}