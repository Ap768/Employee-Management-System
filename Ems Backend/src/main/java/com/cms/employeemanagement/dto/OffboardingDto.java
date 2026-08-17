package com.cms.employeemanagement.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class OffboardingDto {

    private Long id;

    private Long employeeId;

    private String employeeName;

    private String employeeEmail;

    private String department;

    private LocalDate lastWorkingDay;

    private String reason;

    private String exitInterview;

    private Boolean itClearance;

    private Boolean hrClearance;

    private Boolean financeClearance;

    private String status;

    private LocalDateTime createdAt;

    public OffboardingDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getLastWorkingDay() {
        return lastWorkingDay;
    }

    public void setLastWorkingDay(LocalDate lastWorkingDay) {
        this.lastWorkingDay = lastWorkingDay;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getExitInterview() {
        return exitInterview;
    }

    public void setExitInterview(String exitInterview) {
        this.exitInterview = exitInterview;
    }

    public Boolean getItClearance() {
        return itClearance;
    }

    public void setItClearance(Boolean itClearance) {
        this.itClearance = itClearance;
    }

    public Boolean getHrClearance() {
        return hrClearance;
    }

    public void setHrClearance(Boolean hrClearance) {
        this.hrClearance = hrClearance;
    }

    public Boolean getFinanceClearance() {
        return financeClearance;
    }

    public void setFinanceClearance(Boolean financeClearance) {
        this.financeClearance = financeClearance;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}