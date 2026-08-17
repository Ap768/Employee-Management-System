package com.cms.employeemanagement.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.employeemanagement.dto.OffboardingDto;
import com.cms.employeemanagement.entity.Offboarding;
import com.cms.employeemanagement.entity.User;
import com.cms.employeemanagement.repository.OffboardingRepository;
import com.cms.employeemanagement.repository.UserRepository;
import com.cms.employeemanagement.service.OffboardingService;

@Service
public class OffboardingServiceImpl implements OffboardingService {

    @Autowired
    private OffboardingRepository offboardingRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public OffboardingDto createOffboarding(OffboardingDto dto) {

        Offboarding offboarding = convertToEntity(dto);

        Offboarding saved = offboardingRepository.save(offboarding);

        return convertToDto(saved);

    }

    @Override
    public OffboardingDto updateOffboarding(Long id, OffboardingDto dto) {

        Offboarding offboarding = offboardingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Offboarding record not found."));

        offboarding.setEmployeeId(dto.getEmployeeId());
        offboarding.setEmployeeName(dto.getEmployeeName());
        offboarding.setEmployeeEmail(dto.getEmployeeEmail());
        offboarding.setDepartment(dto.getDepartment());
        offboarding.setLastWorkingDay(dto.getLastWorkingDay());
        offboarding.setReason(dto.getReason());
        offboarding.setExitInterview(dto.getExitInterview());
        offboarding.setItClearance(dto.getItClearance());
        offboarding.setHrClearance(dto.getHrClearance());
        offboarding.setFinanceClearance(dto.getFinanceClearance());
        offboarding.setStatus(dto.getStatus());

        Offboarding updated = offboardingRepository.save(offboarding);

        return convertToDto(updated);

    }

    @Override
    public void deleteOffboarding(Long id) {

        offboardingRepository.deleteById(id);

    }

    @Override
    public List<OffboardingDto> getAllOffboarding() {

        return offboardingRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    @Override
    public OffboardingDto getOffboardingById(Long id) {

        Offboarding offboarding = offboardingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Offboarding record not found."));

        return convertToDto(offboarding);

    }

    @Override
    public List<OffboardingDto> searchByEmployeeName(String employeeName) {

        return offboardingRepository
                .findByEmployeeNameContainingIgnoreCase(employeeName)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    @Override
    public List<OffboardingDto> getByStatus(String status) {

        return offboardingRepository
                .findByStatus(status)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    @Override
    public OffboardingDto completeOffboarding(Long id) {

        Offboarding offboarding = offboardingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Offboarding record not found."));

        offboarding.setStatus("COMPLETED");

        User user = userRepository.findByEmail(offboarding.getEmployeeEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        user.setActive(false);

        userRepository.save(user);

        Offboarding updated = offboardingRepository.save(offboarding);

        return convertToDto(updated);

    }

    private OffboardingDto convertToDto(Offboarding offboarding) {

        OffboardingDto dto = new OffboardingDto();

        dto.setId(offboarding.getId());
        dto.setEmployeeId(offboarding.getEmployeeId());
        dto.setEmployeeName(offboarding.getEmployeeName());
        dto.setEmployeeEmail(offboarding.getEmployeeEmail());
        dto.setDepartment(offboarding.getDepartment());
        dto.setLastWorkingDay(offboarding.getLastWorkingDay());
        dto.setReason(offboarding.getReason());
        dto.setExitInterview(offboarding.getExitInterview());
        dto.setItClearance(offboarding.getItClearance());
        dto.setHrClearance(offboarding.getHrClearance());
        dto.setFinanceClearance(offboarding.getFinanceClearance());
        dto.setStatus(offboarding.getStatus());
        dto.setCreatedAt(offboarding.getCreatedAt());

        return dto;

    }

    private Offboarding convertToEntity(OffboardingDto dto) {

        Offboarding offboarding = new Offboarding();

        offboarding.setEmployeeId(dto.getEmployeeId());
        offboarding.setEmployeeName(dto.getEmployeeName());
        offboarding.setEmployeeEmail(dto.getEmployeeEmail());
        offboarding.setDepartment(dto.getDepartment());
        offboarding.setLastWorkingDay(dto.getLastWorkingDay());
        offboarding.setReason(dto.getReason());
        offboarding.setExitInterview(dto.getExitInterview());
        offboarding.setItClearance(dto.getItClearance());
        offboarding.setHrClearance(dto.getHrClearance());
        offboarding.setFinanceClearance(dto.getFinanceClearance());

        if (dto.getStatus() == null || dto.getStatus().isEmpty()) {

            offboarding.setStatus("PENDING");

        } else {

            offboarding.setStatus(dto.getStatus());

        }

        return offboarding;

    }

}