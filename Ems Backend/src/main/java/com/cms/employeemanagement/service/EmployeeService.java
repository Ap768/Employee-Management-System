package com.cms.employeemanagement.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.cms.employeemanagement.dto.EmployeeDto;
import com.cms.employeemanagement.entity.Employee;

public interface EmployeeService {

    Employee saveEmployee(EmployeeDto employeeDto);

    Employee updateEmployee(Long id, EmployeeDto employeeDto);

    void deleteEmployee(Long id);

    Employee getEmployeeById(Long id);

    List<Employee> getAllEmployees();

    Page<Employee> getEmployees(int page, int size);

    List<Employee> refreshEmployees();

    String uploadCsv(MultipartFile file) throws IOException;
}