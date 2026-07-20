package com.cms.employeemanagement.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cms.employeemanagement.entity.Employee;

public class CsvHelper {

    public static List<Employee> csvToEmployees(MultipartFile file) throws IOException {

        List<Employee> employees = new ArrayList<>();

        BufferedReader br = new BufferedReader(
                new InputStreamReader(file.getInputStream()));

        String line;

        boolean firstRow = true;

        while ((line = br.readLine()) != null) {

            if (firstRow) {
                firstRow = false;
                continue;
            }

            String[] data = line.split(",");

            Employee employee = new Employee();

            employee.setName(data[0].trim());
            employee.setEmail(data[1].trim());
            employee.setDepartment(data[2].trim());
            employee.setSalary(Double.parseDouble(data[3].trim()));

            employees.add(employee);

        }

        br.close();

        return employees;

    }

}