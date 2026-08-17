	package com.cms.employeemanagement.dto;
	
	import java.time.LocalDate;
	import java.time.LocalDateTime;
	
	import com.cms.employeemanagement.entity.AttendanceStatus;
	
	public class AttendanceDto {
	
	    private Long id;
	
	    private Long employeeId;
	
	    private String employeeName;
	
	    private String employeeEmail;
	
	    private LocalDate date;
	
	    private LocalDateTime checkInTime;
	
	    private LocalDateTime checkOutTime;
	
	    private String workingHours;
	
	    private AttendanceStatus status;
	
	    public AttendanceDto() {
	    }
	
	    public AttendanceDto(Long id, Long employeeId, String employeeName,
	            String employeeEmail, LocalDate date,
	            LocalDateTime checkInTime, LocalDateTime checkOutTime,
	            String workingHours, AttendanceStatus status) {
	
	        this.id = id;
	        this.employeeId = employeeId;
	        this.employeeName = employeeName;
	        this.employeeEmail = employeeEmail;
	        this.date = date;
	        this.checkInTime = checkInTime;
	        this.checkOutTime = checkOutTime;
	        this.workingHours = workingHours;
	        this.status = status;
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
	
	    public LocalDate getDate() {
	        return date;
	    }
	
	    public void setDate(LocalDate date) {
	        this.date = date;
	    }
	
	    public LocalDateTime getCheckInTime() {
	        return checkInTime;
	    }
	
	    public void setCheckInTime(LocalDateTime checkInTime) {
	        this.checkInTime = checkInTime;
	    }
	
	    public LocalDateTime getCheckOutTime() {
	        return checkOutTime;
	    }
	
	    public void setCheckOutTime(LocalDateTime checkOutTime) {
	        this.checkOutTime = checkOutTime;
	    }
	
	    public String getWorkingHours() {
	        return workingHours;
	    }
	
	    public void setWorkingHours(String workingHours) {
	        this.workingHours = workingHours;
	    }
	
	    public AttendanceStatus getStatus() {
	        return status;
	    }
	
	    public void setStatus(AttendanceStatus status) {
	        this.status = status;
	    }
	
	}