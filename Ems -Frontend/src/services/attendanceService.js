import api from "../api/axios";

// Check In
export const checkIn = (email) =>
    api.post(`/attendance/checkin/${email}`);

// Check Out
export const checkOut = (email) =>
    api.put(`/attendance/checkout/${email}`);
    
// Today's Attendance
export const getTodayAttendance = (email) =>
    api.get(`/attendance/today/${email}`);

// Attendance History
export const getAttendanceHistory = (email) =>
    api.get(`/attendance/history/${email}`);

// Attendance by Date
export const getAttendanceByDate = (email, date) =>
    api.get(`/attendance/date/${email}/${date}`);

// Admin - All Attendance
export const getAllAttendance = () =>
    api.get("/attendance");

// Admin - ALL employees attendance for selected date
export const getAllEmployeesAttendanceByDate = (date) =>
    api.get(`/attendance/management/${date}`);