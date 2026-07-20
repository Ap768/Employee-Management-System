package com.cms.employeemanagement.service.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cms.employeemanagement.dto.EmployeeDto;
import com.cms.employeemanagement.entity.Employee;
import com.cms.employeemanagement.repository.EmployeeRepository;
import com.cms.employeemanagement.service.EmployeeService;
import com.cms.employeemanagement.util.CsvHelper;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(EmployeeDto dto) {

        Employee employee = new Employee();

        BeanUtils.copyProperties(dto, employee);

        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDto dto) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        BeanUtils.copyProperties(dto, employee, "id");

        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employeeRepository.delete(employee);
    }

    @Override
    public Employee getEmployeeById(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @Override
    public List<Employee> getAllEmployees() {

        return employeeRepository.findAll();
    }

    @Override
    public Page<Employee> getEmployees(int page, int size) {

        return employeeRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public List<Employee> refreshEmployees() {

        return employeeRepository.findAll();
    }

    @Override
    
    public String uploadCsv(MultipartFile file) throws IOException {

        List<Employee> employees = CsvHelper.csvToEmployees(file);

        employeeRepository.saveAll(employees);

        return "CSV Uploaded Successfully";

    }
}