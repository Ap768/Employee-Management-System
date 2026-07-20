package com.cms.employeemanagement;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cms.employeemanagement.service.OtpService;

@SpringBootTest
public class OtpServiceTest {

    @Autowired
    private OtpService otpService;

    @Test
    public void testGenerateOtp() {

        String otp = otpService.generateOtp();

        assertEquals(6, otp.length());
    }
}