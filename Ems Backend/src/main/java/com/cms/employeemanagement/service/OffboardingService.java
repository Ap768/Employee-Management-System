package com.cms.employeemanagement.service;

import java.util.List;

import com.cms.employeemanagement.dto.OffboardingDto;

public interface OffboardingService {

    OffboardingDto createOffboarding(OffboardingDto offboardingDto);

    OffboardingDto updateOffboarding(Long id, OffboardingDto offboardingDto);

    void deleteOffboarding(Long id);

    List<OffboardingDto> getAllOffboarding();

    OffboardingDto getOffboardingById(Long id);

    List<OffboardingDto> searchByEmployeeName(String employeeName);

    List<OffboardingDto> getByStatus(String status);

    OffboardingDto completeOffboarding(Long id);

}