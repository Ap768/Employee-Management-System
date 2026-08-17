package com.cms.employeemanagement.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cms.employeemanagement.dto.ForgotPasswordRequest;
import com.cms.employeemanagement.dto.LoginRequest;
import com.cms.employeemanagement.dto.LoginResponse;
import com.cms.employeemanagement.dto.OtpRequest;
import com.cms.employeemanagement.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(userService.login(request));

    }

    @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(@Valid @RequestBody OtpRequest request) {

        return ResponseEntity.ok(userService.verifyOtp(request));

    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        return ResponseEntity.ok(userService.forgotPassword(request));

    }

}