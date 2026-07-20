package com.cms.employeemanagement;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cms.employeemanagement.dto.EmployeeDto;
import com.cms.employeemanagement.entity.Employee;
import com.cms.employeemanagement.service.EmployeeService;

@SpringBootTest
public class EmployeeServiceTest {

    @Autowired
    private EmployeeService employeeService;

    @Test
    public void testSaveEmployee() {

        EmployeeDto dto = new EmployeeDto();

        dto.setName("JUnit Employee");
        dto.setEmail("junit@gmail.com");
        dto.setDepartment("IT");
        dto.setSalary(45000.0);

        Employee employee = employeeService.saveEmployee(dto);

        assertNotNull(employee);
        assertNotNull(employee.getId());
    }
}