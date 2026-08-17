package com.cms.employeemanagement;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cms.employeemanagement.dto.LoginRequest;
import com.cms.employeemanagement.service.UserService;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void testLogin() {

        LoginRequest request = new LoginRequest();

        request.setEmail("admin@gmail.com");
        request.setPassword("admin123");

        String result = userService.login(request);

        assertEquals("OTP_SENT", result);
    }
}