import api from "../api/axios";

// Employee
export const applyLeave = (leaveData) =>
    api.post("/leaves/apply", leaveData);

export const getMyLeaves = (email) =>
    api.get(`/leaves/my/${email}`);

export const cancelLeave = (id) =>
    api.put(`/leaves/${id}/cancel`);

// HR/Admin
export const getAllLeaves = () =>
    api.get("/leaves");

export const approveLeave = (id) =>
    api.put(`/leaves/${id}/approve`);

export const rejectLeave = (id) =>
    api.put(`/leaves/${id}/reject`);

// Leave Balance
export const getLeaveBalance = (email) =>
    api.get(`/leaves/balance/${email}`);