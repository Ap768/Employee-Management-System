package com.cms.employeemanagement.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.employeemanagement.dto.DashboardResponse;
import com.cms.employeemanagement.entity.LeaveStatus;
import com.cms.employeemanagement.repository.EmployeeRepository;
import com.cms.employeemanagement.repository.LeaveRepository;
import com.cms.employeemanagement.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    @Override
    public DashboardResponse getDashboardData() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalEmployees(employeeRepository.count());

        response.setPendingLeaves(
                leaveRepository.countByStatus(LeaveStatus.PENDING));

        response.setApprovedLeaves(
                leaveRepository.countByStatus(LeaveStatus.APPROVED));

        response.setRejectedLeaves(
                leaveRepository.countByStatus(LeaveStatus.REJECTED));

        return response;
    }
}