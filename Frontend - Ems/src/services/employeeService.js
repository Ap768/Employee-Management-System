import api from "../api/axios";

export const getEmployees = (page) =>
    api.get(`/employees/pagination?page=${page}&size=5`);

export const addEmployee = (employee) =>
    api.post("/employees", employee);

export const updateEmployee = (employee) =>
    api.put(`/employees/${employee.id}`, employee);

export const deleteEmployee = (id) =>
    api.delete(`/employees/${id}`);

export const refreshEmployees = () =>
    api.get("/employees/refresh");