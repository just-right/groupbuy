package com.example.demo.repository;

import com.example.demo.entity.Administrator;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AdministratorRepository extends JpaRepository<Administrator,Integer> {
    @Query(value = "select * from administrator where account_name=:account_name and account_password=:account_password limit 1", nativeQuery = true)
    Administrator getAdministratorbyNameAndPwd(@Param(value = "account_name") String account_name, @Param(value = "account_password") String account_password);

    @Transactional
    @Modifying
    @Query(value = "update merchant set account_status=2 where merchant_id=:merchant_id",nativeQuery = true)
    Integer merchantCheckOrRelieve(@Param(value = "merchant_id")Integer merchant_id);

    @Transactional
    @Modifying
    @Query(value = "update user set user_status=2 where user_id=:user_id",nativeQuery = true)
    Integer userCheckOrRelieve(@Param(value = "user_id")Integer user_id);

    @Transactional
    @Modifying
    @Query(value = "update merchant set account_status=3 where merchant_id=:merchant_id",nativeQuery = true)
    Integer merchantBanned(@Param(value = "merchant_id")Integer merchant_id);

    @Transactional
    @Modifying
    @Query(value = "update user set user_status=3 where user_id=:user_id",nativeQuery = true)
    Integer userBanned(@Param(value = "user_id")Integer user_id);




}
