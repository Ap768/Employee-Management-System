package com.cms.employeemanagement.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.employeemanagement.entity.Otp;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);

}