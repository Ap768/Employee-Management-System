package com.cms.employeemanagement.service;

import java.util.List;
import com.cms.employeemanagement.dto.LeaveBalanceDto;

import com.cms.employeemanagement.dto.LeaveRequestDto;
import com.cms.employeemanagement.entity.LeaveRequest;

public interface LeaveService {

    LeaveRequest applyLeave(LeaveRequestDto request);

    List<LeaveRequest> getMyLeaves(String email);

    List<LeaveRequest> getAllLeaves();

    LeaveRequest approveLeave(Long id);

    LeaveRequest rejectLeave(Long id);

    LeaveRequest cancelLeave(Long id);
    LeaveBalanceDto getLeaveBalance(String email);
}