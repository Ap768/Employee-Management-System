package com.cms.employeemanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.employeemanagement.entity.Offboarding;

@Repository
public interface OffboardingRepository extends JpaRepository<Offboarding, Long> {

    List<Offboarding> findAllByOrderByCreatedAtDesc();

    List<Offboarding> findByEmployeeNameContainingIgnoreCase(String employeeName);

    List<Offboarding> findByEmployeeEmail(String employeeEmail);

    List<Offboarding> findByStatus(String status);

}