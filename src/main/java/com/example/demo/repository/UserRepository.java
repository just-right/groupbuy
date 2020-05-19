package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "select * from user where account_name=:account_name and account_password=:account_password limit 1", nativeQuery = true)
    User getUserbyNameAndPwd(@Param(value = "account_name") String account_name, @Param(value = "account_password") String account_password);

    @Transactional
    @Modifying
    @Query(value = "update user set account_password=:account_password,username=:username,sex=:sex,address=:address,telephonenumber=:telephonenumber where user_id=:user_id",nativeQuery = true)
    Integer updateMerchant(@Param(value = "account_password") String account_password,@Param(value = "username") String username,@Param(value = "sex") String sex,@Param(value = "address") String address, @Param(value = "telephonenumber") String telephonenumber,@Param(value = "user_id")Integer user_id);

    @Query(value = "select * from user where user_id=:user_id and user_status=2 limit 1", nativeQuery = true)
    User getUserByIdNormal(@Param(value = "user_id") Integer user_id);

    @Query(value = "select * from user where user_id=:user_id and user_status=3 limit 1", nativeQuery = true)
    User getUserByIdBanned(@Param(value = "user_id") Integer user_id);

    @Query(value = "select * from user where user_id=:user_id and user_status=1 limit 1", nativeQuery = true)
    User getUserByIdApply(@Param(value = "user_id") Integer user_id);

    @Query(value = "select * from user where user_status=2", nativeQuery = true)
    List<User> getUserListNormal();

    @Query(value = "select * from user where user_status=3", nativeQuery = true)
    List<User> getUserListBanned();

    @Query(value = "select * from user where user_status=1", nativeQuery = true)
    List<User> getUserListApply();

    @Query(value = "select * from user where account_name=:account_name limit 1", nativeQuery = true)
    User userRegisterCheckbyAccount(@Param(value = "account_name")String account_name);

    @Query(value = "select * from user where telephonenumber=:telephonenumber limit 1", nativeQuery = true)
    User userRegisterCheckbyTel(@Param(value = "telephonenumber")String telephonenumber);

}
