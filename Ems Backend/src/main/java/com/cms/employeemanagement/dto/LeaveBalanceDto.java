package com.cms.employeemanagement.dto;

public class LeaveBalanceDto {

    private Integer casualLeave;
    private Integer sickLeave;
    private Integer earnedLeave;

    public LeaveBalanceDto() {
    }

    public LeaveBalanceDto(Integer casualLeave, Integer sickLeave, Integer earnedLeave) {
        this.casualLeave = casualLeave;
        this.sickLeave = sickLeave;
        this.earnedLeave = earnedLeave;
    }

    public Integer getCasualLeave() {
        return casualLeave;
    }

    public void setCasualLeave(Integer casualLeave) {
        this.casualLeave = casualLeave;
    }

    public Integer getSickLeave() {
        return sickLeave;
    }

    public void setSickLeave(Integer sickLeave) {
        this.sickLeave = sickLeave;
    }

    public Integer getEarnedLeave() {
        return earnedLeave;
    }

    public void setEarnedLeave(Integer earnedLeave) {
        this.earnedLeave = earnedLeave;
    }
}