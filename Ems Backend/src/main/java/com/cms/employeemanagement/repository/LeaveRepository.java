package com.cms.employeemanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.employeemanagement.entity.LeaveRequest;
import com.cms.employeemanagement.entity.LeaveStatus;

@Repository
public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployeeEmail(String employeeEmail);

    List<LeaveRequest> findByStatus(LeaveStatus status);

    long countByStatus(LeaveStatus status);

}