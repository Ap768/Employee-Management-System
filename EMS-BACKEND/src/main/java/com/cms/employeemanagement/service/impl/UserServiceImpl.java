package com.cms.employeemanagement.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cms.employeemanagement.dto.ForgotPasswordRequest;
import com.cms.employeemanagement.dto.LoginRequest;
import com.cms.employeemanagement.dto.LoginResponse;
import com.cms.employeemanagement.dto.OtpRequest;
import com.cms.employeemanagement.entity.Otp;
import com.cms.employeemanagement.entity.User;
import com.cms.employeemanagement.repository.OtpRepository;
import com.cms.employeemanagement.repository.UserRepository;
import com.cms.employeemanagement.service.OtpService;
import com.cms.employeemanagement.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private OtpService otpService;

    @Override
    @Transactional
    public String login(LoginRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (!optionalUser.isPresent()) {
            throw new RuntimeException("Invalid Email");
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String otpValue = otpService.generateOtp();

        Otp otp = new Otp();
        otp.setEmail(user.getEmail());
        otp.setOtp(otpValue);
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.deleteByEmail(user.getEmail());
        otpRepository.save(otp);

        System.out.println("Generated OTP : " + otpValue);

        return "OTP_SENT";
    }

    @Override
    public LoginResponse verifyOtp(OtpRequest request) {

        boolean valid = otpService.validateOtp(request.getEmail(), request.getOtp());

        if (!valid) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new LoginResponse(user.getEmail(), user.getRole().name());
    }

    @Override
    @Transactional
    public String forgotPassword(ForgotPasswordRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (!optionalUser.isPresent()) {
            throw new RuntimeException("Email not found");
        }

        String otp = otpService.generateOtp();

        Otp otpEntity = new Otp();
        otpEntity.setEmail(request.getEmail());
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.deleteByEmail(request.getEmail());
        otpRepository.save(otpEntity);

        System.out.println("Forgot Password OTP : " + otp);

        return "OTP_SENT";
    }
}