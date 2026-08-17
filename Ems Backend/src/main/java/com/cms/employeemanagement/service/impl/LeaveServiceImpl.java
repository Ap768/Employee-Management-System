package com.cms.employeemanagement.service.impl;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.employeemanagement.dto.LeaveBalanceDto;
import com.cms.employeemanagement.dto.LeaveRequestDto;
import com.cms.employeemanagement.entity.Employee;
import com.cms.employeemanagement.entity.LeaveRequest;
import com.cms.employeemanagement.entity.LeaveStatus;
import com.cms.employeemanagement.entity.LeaveType;
import com.cms.employeemanagement.repository.EmployeeRepository;
import com.cms.employeemanagement.repository.LeaveRepository;
import com.cms.employeemanagement.service.LeaveService;

@Service
public class LeaveServiceImpl implements LeaveService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    @Override
    public LeaveRequest applyLeave(LeaveRequestDto request) {

        if (request.getEmployeeEmail() == null || request.getEmployeeEmail().trim().isEmpty()) {
            throw new RuntimeException("Employee Email is missing.");
        }

        Employee employee = employeeRepository.findByEmail(request.getEmployeeEmail())
                .orElseThrow(() -> new RuntimeException(
                        "Employee not found with email: " + request.getEmployeeEmail()));

        LeaveRequest leave = new LeaveRequest();

        leave.setEmployeeId(employee.getId());
        leave.setEmployeeName(employee.getName());
        leave.setEmployeeEmail(employee.getEmail());
        leave.setLeaveType(request.getLeaveType());
        leave.setFromDate(request.getFromDate());
        leave.setToDate(request.getToDate());
        leave.setReason(request.getReason());
        leave.setStatus(LeaveStatus.PENDING);
        leave.setAppliedDate(LocalDateTime.now());

        return leaveRepository.save(leave);
    }

    @Override
    public List<LeaveRequest> getMyLeaves(String email) {
        return leaveRepository.findByEmployeeEmail(email);
    }

    @Override
    public LeaveBalanceDto getLeaveBalance(String email) {

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return new LeaveBalanceDto(
                employee.getCasualLeave(),
                employee.getSickLeave(),
                employee.getEarnedLeave());
    }

    @Override
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepository.findAll();
    }

    @Override
    public LeaveRequest approveLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave Request Not Found"));

        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Only Pending Leave Can Be Approved");
        }

        Employee employee = employeeRepository.findByEmail(leave.getEmployeeEmail())
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));

        long days = ChronoUnit.DAYS.between(
                leave.getFromDate(),
                leave.getToDate()) + 1;

        LeaveType leaveType = leave.getLeaveType();

        switch (leaveType) {

            case CASUAL:

                if (employee.getCasualLeave() < days) {
                    throw new RuntimeException("Insufficient Casual Leave Balance");
                }

                employee.setCasualLeave(employee.getCasualLeave() - (int) days);
                break;

            case SICK:

                if (employee.getSickLeave() < days) {
                    throw new RuntimeException("Insufficient Sick Leave Balance");
                }

                employee.setSickLeave(employee.getSickLeave() - (int) days);
                break;

            case EARNED:

                if (employee.getEarnedLeave() < days) {
                    throw new RuntimeException("Insufficient Earned Leave Balance");
                }

                employee.setEarnedLeave(employee.getEarnedLeave() - (int) days);
                break;

            case UNPAID:

                break;

            default:
                throw new RuntimeException("Invalid Leave Type");
        }

        employeeRepository.save(employee);

        leave.setStatus(LeaveStatus.APPROVED);

        return leaveRepository.save(leave);
    }

    @Override
    public LeaveRequest rejectLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave Request Not Found"));

        leave.setStatus(LeaveStatus.REJECTED);

        return leaveRepository.save(leave);
    }

    @Override
    public LeaveRequest cancelLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave Request Not Found"));

        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Only Pending Leave Can Be Cancelled");
        }

        leave.setStatus(LeaveStatus.CANCELLED);

        return leaveRepository.save(leave);
    }
}