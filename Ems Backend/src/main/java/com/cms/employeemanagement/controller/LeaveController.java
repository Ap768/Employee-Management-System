package com.cms.employeemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cms.employeemanagement.dto.LeaveBalanceDto;
import com.cms.employeemanagement.dto.LeaveRequestDto;
import com.cms.employeemanagement.entity.LeaveRequest;
import com.cms.employeemanagement.service.LeaveService;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping("/apply")
    public LeaveRequest applyLeave(@RequestBody LeaveRequestDto request) {

        return leaveService.applyLeave(request);

    }

    @GetMapping("/my/{email}")
    public List<LeaveRequest> getMyLeaves(@PathVariable String email) {

        return leaveService.getMyLeaves(email);

    }

    @GetMapping("/balance/{email}")
    public LeaveBalanceDto getLeaveBalance(@PathVariable String email) {

        return leaveService.getLeaveBalance(email);

    }

    @GetMapping
    public List<LeaveRequest> getAllLeaves() {

        return leaveService.getAllLeaves();

    }

    @PutMapping("/{id}/approve")
    public LeaveRequest approveLeave(@PathVariable Long id) {

        return leaveService.approveLeave(id);

    }

    @PutMapping("/{id}/reject")
    public LeaveRequest rejectLeave(@PathVariable Long id) {

        return leaveService.rejectLeave(id);

    }

    @PutMapping("/{id}/cancel")
    public LeaveRequest cancelLeave(@PathVariable Long id) {

        return leaveService.cancelLeave(id);

    }
}