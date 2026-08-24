import api from "../api/axios";

// Get All Offboarding Records
export const getAllOffboarding = () =>
    api.get("/offboarding");

// Get Offboarding By Id
export const getOffboardingById = (id) =>
    api.get(`/offboarding/${id}`);

// Create Offboarding
export const createOffboarding = (offboardingData) =>
    api.post("/offboarding", offboardingData);

// Update Offboarding
export const updateOffboarding = (id, offboardingData) =>
    api.put(`/offboarding/${id}`, offboardingData);

// Delete Offboarding
export const deleteOffboarding = (id) =>
    api.delete(`/offboarding/${id}`);

// Search Employee
export const searchEmployee = (employeeName) =>
    api.get(`/offboarding/search/${employeeName}`);

// Filter By Status
export const getByStatus = (status) =>
    api.get(`/offboarding/status/${status}`);

// Complete Offboarding
export const completeOffboarding = (id) =>
    api.put(`/offboarding/${id}/complete`);