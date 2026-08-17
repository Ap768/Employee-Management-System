package com.cms.employeemanagement.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.employeemanagement.entity.Holiday;
import com.cms.employeemanagement.repository.HolidayRepository;
import com.cms.employeemanagement.service.HolidayService;

@Service
public class HolidayServiceImpl implements HolidayService {

    @Autowired
    private HolidayRepository holidayRepository;

    @Override
    public Holiday addHoliday(Holiday holiday) {

        return holidayRepository.save(holiday);

    }

    @Override
    public Holiday updateHoliday(Long id, Holiday holiday) {

        Holiday existingHoliday = holidayRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Holiday Not Found"));

        existingHoliday.setHolidayName(holiday.getHolidayName());
        existingHoliday.setHolidayDate(holiday.getHolidayDate());
        existingHoliday.setDayOfWeek(holiday.getDayOfWeek());        existingHoliday.setDescription(holiday.getDescription());

        return holidayRepository.save(existingHoliday);

    }

    @Override
    public void deleteHoliday(Long id) {

        Holiday holiday = holidayRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Holiday Not Found"));

        holidayRepository.delete(holiday);

    }

    @Override
    public List<Holiday> getAllHolidays() {

        return holidayRepository.findAllByOrderByHolidayDateAsc();

    }

    @Override
    public List<Holiday> getUpcomingHolidays() {

        return holidayRepository
                .findByHolidayDateGreaterThanEqualOrderByHolidayDateAsc(
                        LocalDate.now());

    }

    @Override
    public Holiday getHolidayById(Long id) {

        return holidayRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Holiday Not Found"));

    }

}