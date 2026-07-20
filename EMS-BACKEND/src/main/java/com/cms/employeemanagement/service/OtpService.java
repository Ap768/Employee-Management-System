package com.cms.employeemanagement.service;

public interface OtpService {

    String generateOtp();

    boolean validateOtp(String email, String otp);

}