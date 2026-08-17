package com.cms.employeemanagement.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.employeemanagement.entity.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeEmailAndDate(String employeeEmail, LocalDate date);

    List<Attendance> findByEmployeeEmailOrderByDateDesc(String employeeEmail);

    List<Attendance> findByDate(LocalDate date);

    List<Attendance> findAllByOrderByDateDesc();

}