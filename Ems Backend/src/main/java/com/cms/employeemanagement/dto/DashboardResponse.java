package com.cms.employeemanagement.dto;

public class DashboardResponse {

    private long totalEmployees;
    private long pendingLeaves;
    private long approvedLeaves;
    private long rejectedLeaves;

    public DashboardResponse() {
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getPendingLeaves() {
        return pendingLeaves;
    }

    public void setPendingLeaves(long pendingLeaves) {
        this.pendingLeaves = pendingLeaves;
    }

    public long getApprovedLeaves() {
        return approvedLeaves;
    }

    public void setApprovedLeaves(long approvedLeaves) {
        this.approvedLeaves = approvedLeaves;
    }

    public long getRejectedLeaves() {
        return rejectedLeaves;
    }

    public void setRejectedLeaves(long rejectedLeaves) {
        this.rejectedLeaves = rejectedLeaves;
    }
}