import axios from "axios";

const API_URL = "http://localhost:9090/api/holidays";

// Get All Holidays
export const getAllHolidays = () => {
    return axios.get(API_URL);
};

// Get Upcoming Holidays
export const getUpcomingHolidays = () => {
    return axios.get(`${API_URL}/upcoming`);
};

// Get Holiday By Id
export const getHolidayById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Add Holiday
export const addHoliday = (holiday) => {
    return axios.post(API_URL, holiday);
};

// Update Holiday
export const updateHoliday = (id, holiday) => {
    return axios.put(`${API_URL}/${id}`, holiday);
};

// Delete Holiday
export const deleteHoliday = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};