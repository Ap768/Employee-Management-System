package com.cms.employeemanagement.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    private static final Logger logger =
            LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private OtpService otpService;


   
    @Override
    @Transactional
    public String login(LoginRequest request) {

        logger.info(
                "Login attempt for email: {}",
                request.getEmail()
        );


        Optional<User> optionalUser =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (!optionalUser.isPresent()) {

            logger.warn(
                    "Login failed - user not found: {}",
                    request.getEmail()
            );

            throw new RuntimeException("Invalid Email");
        }

        User user = optionalUser.get();


      

        if (Boolean.FALSE.equals(user.getActive())) {

            logger.warn(
                    "Login blocked - account disabled: {}",
                    user.getEmail()
            );

            throw new RuntimeException(
                    "Your account has been disabled. Please contact HR."
            );
        }



        if (!user.getPassword().equals(
                request.getPassword())) {

            logger.warn(
                    "Login failed - invalid password for: {}",
                    request.getEmail()
            );

            throw new RuntimeException(
                    "Invalid Password"
            );
        }



        String otpValue =
                otpService.generateOtp();

        logger.info(
                "OTP generated successfully for: {}",
                user.getEmail()
        );


        Otp otp = new Otp();

        otp.setEmail(
                user.getEmail()
        );

        otp.setOtp(
                otpValue
        );

        otp.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );


       

        otpRepository.deleteByEmail(
                user.getEmail()
        );

        logger.debug(
                "Previous OTP deleted for: {}",
                user.getEmail()
        );



        otpRepository.save(otp);

        logger.info(
                "New OTP saved successfully for: {}",
                user.getEmail()
        );


        

        logger.info(
                "=================================================="
        );

        logger.info(
                "LOGIN OTP FOR {} : {}",
                user.getEmail(),
                otpValue
        );

        logger.info(
                "OTP VALID FOR : 5 MINUTES"
        );

        logger.info(
                "=================================================="
        );


              return "OTP_SENT";
    }


    

    @Override
    public LoginResponse verifyOtp(
            OtpRequest request) {

        logger.info(
                "OTP verification attempt for email: {}",
                request.getEmail()
        );



        boolean valid =
                otpService.validateOtp(
                        request.getEmail(),
                        request.getOtp()
                );


        if (!valid) {

            logger.warn(
                    "OTP verification failed for email: {}",
                    request.getEmail()
            );

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }


       

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


       

        if (Boolean.FALSE.equals(user.getActive())) {

            logger.warn(
                    "OTP verification blocked - account disabled: {}",
                    user.getEmail()
            );

            throw new RuntimeException(
                    "Your account has been disabled. Please contact HR."
            );
        }


      

        logger.info(
                "OTP verified successfully for email: {}",
                user.getEmail()
        );

        logger.info(
                "Login successful for email: {} with role: {}",
                user.getEmail(),
                user.getRole()
        );


        return new LoginResponse(
                user.getEmail(),
                user.getRole().name()
        );
    }


        @Override
    @Transactional
    public String forgotPassword(
            ForgotPasswordRequest request) {

        logger.info(
                "Forgot password request for email: {}",
                request.getEmail()
        );


       

        Optional<User> optionalUser =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (!optionalUser.isPresent()) {

            logger.warn(
                    "Forgot password failed - email not found: {}",
                    request.getEmail()
            );

            throw new RuntimeException(
                    "Email not found"
            );
        }


      

        String otpValue =
                otpService.generateOtp();

        logger.info(
                "Forgot password OTP generated for: {}",
                request.getEmail()
        );


      

        Otp otpEntity = new Otp();

        otpEntity.setEmail(
                request.getEmail()
        );

        otpEntity.setOtp(
                otpValue
        );

        otpEntity.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );



        otpRepository.deleteByEmail(
                request.getEmail()
        );



        otpRepository.save(
                otpEntity
        );

        logger.info(
                "Forgot password OTP saved successfully for: {}",
                request.getEmail()
        );



        logger.info(
                "=================================================="
        );

        logger.info(
                "FORGOT PASSWORD OTP FOR {} : {}",
                request.getEmail(),
                otpValue
        );

        logger.info(
                "OTP VALID FOR : 5 MINUTES"
        );

        logger.info(
                "=================================================="
        );


        return "OTP_SENT";
    }
}