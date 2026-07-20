package com.cms.employeemanagement.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.cms.employeemanagement.entity.Role;
import com.cms.employeemanagement.entity.User;
import com.cms.employeemanagement.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        if (!userRepository.existsByEmail("admin@gmail.com")) {

            User admin = new User();

            admin.setEmail("admin@gmail.com");
            admin.setPassword("admin123");
            admin.setRole(Role.ROLE_ADMIN);

            userRepository.save(admin);

        }

        if (!userRepository.existsByEmail("hr@gmail.com")) {

            User hr = new User();

            hr.setEmail("hr@gmail.com");
            hr.setPassword("hr123");
            hr.setRole(Role.ROLE_HR);

            userRepository.save(hr);

        }

    }

}