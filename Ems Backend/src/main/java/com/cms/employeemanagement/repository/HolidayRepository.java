package com.cms.employeemanagement.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.employeemanagement.entity.Holiday;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {

    List<Holiday> findAllByOrderByHolidayDateAsc();

    List<Holiday> findByHolidayDateGreaterThanEqualOrderByHolidayDateAsc(LocalDate date);

}