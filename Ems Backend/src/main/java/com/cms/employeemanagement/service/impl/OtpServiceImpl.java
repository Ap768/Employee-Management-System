package com.cms.employeemanagement.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.employeemanagement.entity.Otp;
import com.cms.employeemanagement.repository.OtpRepository;
import com.cms.employeemanagement.service.OtpService;

@Service
public class OtpServiceImpl implements OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Override
    public String generateOtp() {

        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000));

    }

    @Override
    public boolean validateOtp(String email, String otp) {

        Optional<Otp> optionalOtp = otpRepository.findByEmail(email);

        if (!optionalOtp.isPresent()) {
            return false;
        }

        Otp dbOtp = optionalOtp.get();

        if (!dbOtp.getOtp().equals(otp)) {
            return false;
        }

        if (dbOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            return false;
        }

        return true;
    }
}