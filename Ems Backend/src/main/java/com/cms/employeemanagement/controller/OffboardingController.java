package com.cms.employeemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cms.employeemanagement.dto.OffboardingDto;
import com.cms.employeemanagement.service.OffboardingService;

@RestController
@RequestMapping("/api/offboarding")
@CrossOrigin(origins = "http://localhost:5173")
public class OffboardingController {

    @Autowired
    private OffboardingService offboardingService;

    // Create Offboarding
    @PostMapping
    public OffboardingDto createOffboarding(
            @RequestBody OffboardingDto offboardingDto) {

        return offboardingService.createOffboarding(offboardingDto);

    }

    // Get All Offboarding Records
    @GetMapping
    public List<OffboardingDto> getAllOffboarding() {

        return offboardingService.getAllOffboarding();

    }

    // Get Offboarding By Id
    @GetMapping("/{id}")
    public OffboardingDto getOffboardingById(
            @PathVariable Long id) {

        return offboardingService.getOffboardingById(id);

    }

    // Update Offboarding
    @PutMapping("/{id}")
    public OffboardingDto updateOffboarding(
            @PathVariable Long id,
            @RequestBody OffboardingDto offboardingDto) {

        return offboardingService.updateOffboarding(id, offboardingDto);

    }

    // Delete Offboarding
    @DeleteMapping("/{id}")
    public String deleteOffboarding(
            @PathVariable Long id) {

        offboardingService.deleteOffboarding(id);

        return "Offboarding record deleted successfully.";

    }

    // Search By Employee Name
    @GetMapping("/search/{employeeName}")
    public List<OffboardingDto> searchByEmployeeName(
            @PathVariable String employeeName) {

        return offboardingService.searchByEmployeeName(employeeName);

    }

    // Filter By Status
    @GetMapping("/status/{status}")
    public List<OffboardingDto> getByStatus(
            @PathVariable String status) {

        return offboardingService.getByStatus(status);

    }

    // Complete Offboarding
    @PutMapping("/{id}/complete")
    public OffboardingDto completeOffboarding(
            @PathVariable Long id) {

        return offboardingService.completeOffboarding(id);

    }

}