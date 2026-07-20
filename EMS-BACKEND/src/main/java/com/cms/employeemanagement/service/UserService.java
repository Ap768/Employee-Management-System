package com.cms.employeemanagement.service;

import com.cms.employeemanagement.dto.ForgotPasswordRequest;
import com.cms.employeemanagement.dto.LoginRequest;
import com.cms.employeemanagement.dto.LoginResponse;
import com.cms.employeemanagement.dto.OtpRequest;

public interface UserService {

    String login(LoginRequest request);

    LoginResponse verifyOtp(OtpRequest request);

    String forgotPassword(ForgotPasswordRequest request);

}