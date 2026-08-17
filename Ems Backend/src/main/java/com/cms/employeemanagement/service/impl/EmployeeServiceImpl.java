package com.cms.employeemanagement.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cms.employeemanagement.dto.EmployeeDto;
import com.cms.employeemanagement.entity.Employee;
import com.cms.employeemanagement.entity.Role;
import com.cms.employeemanagement.entity.User;
import com.cms.employeemanagement.repository.EmployeeRepository;
import com.cms.employeemanagement.repository.UserRepository;
import com.cms.employeemanagement.service.EmployeeService;
import com.cms.employeemanagement.util.CsvHelper;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    
    @Override
    public Employee saveEmployee(EmployeeDto dto) {

        if (employeeRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Employee email already exists.");
        }

        Employee employee = new Employee();

        BeanUtils.copyProperties(dto, employee);

        employee.setCasualLeave(12);
        employee.setSickLeave(8);
        employee.setEarnedLeave(15);

        Employee savedEmployee = employeeRepository.save(employee);

        if (!userRepository.findByEmail(dto.getEmail()).isPresent()) {

            User user = new User();

            user.setEmail(dto.getEmail());

            // Default Password
            user.setPassword("employee123");

            user.setRole(Role.ROLE_EMPLOYEE);

            userRepository.save(user);
        }

        return savedEmployee;
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDto dto) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        String oldEmail = employee.getEmail();

        BeanUtils.copyProperties(dto, employee, "id");

        Employee updatedEmployee = employeeRepository.save(employee);

        if (!oldEmail.equals(dto.getEmail())) {

            Optional<User> optionalUser = userRepository.findByEmail(oldEmail);

            if (optionalUser.isPresent()) {

                User user = optionalUser.get();

                user.setEmail(dto.getEmail());

                userRepository.save(user);
            }
        }

        return updatedEmployee;
    }

  
    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        userRepository.findByEmail(employee.getEmail())
                .ifPresent(userRepository::delete);

        employeeRepository.delete(employee);
    }

    @Override
    public Employee getEmployeeById(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    // ===========================
    // GET ALL EMPLOYEES
    // ===========================
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

        for (Employee employee : employees) {

            employee.setCasualLeave(12);
            employee.setSickLeave(8);
            employee.setEarnedLeave(15);

            employeeRepository.save(employee);

            if (!userRepository.findByEmail(employee.getEmail()).isPresent()) {

                User user = new User();

                user.setEmail(employee.getEmail());

                user.setPassword("employee123");

                user.setRole(Role.ROLE_EMPLOYEE);

                userRepository.save(user);
            }
        }

        return "CSV Uploaded Successfully";
    }
}