package com.cms.employeemanagement.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cms.employeemanagement.dto.EmployeeDto;
import com.cms.employeemanagement.entity.Employee;
import com.cms.employeemanagement.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> saveEmployee(@Valid @RequestBody EmployeeDto employeeDto) {

        return ResponseEntity.ok(employeeService.saveEmployee(employeeDto));

    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
            @Valid @RequestBody EmployeeDto employeeDto) {

        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeDto));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.ok("Employee Deleted Successfully");

    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {

        return ResponseEntity.ok(employeeService.getEmployeeById(id));

    }

    @GetMapping("/refresh")
    public ResponseEntity<List<Employee>> refreshEmployees() {

        return ResponseEntity.ok(employeeService.refreshEmployees());

    }

    @GetMapping("/pagination")
    public ResponseEntity<Page<Employee>> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(employeeService.getEmployees(page, size));

    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file)
            throws IOException {

        return ResponseEntity.ok(employeeService.uploadCsv(file));

    }

}