package com.example.demo.controller;

import com.example.demo.fallback.UserFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(value = "user-service",fallback = UserFallback.class)
public interface IUserController {

    @RequestMapping(value = "/api/user/register",method = RequestMethod.POST)
    Map<String,Object> userRegister(@Param(value = "accountname") String accountname, @Param(value = "accountpassword") String accountpassword, @Param(value = "username") String username, @Param(value = "sex") String sex, @Param(value = "address") String address, @Param(value = "telephonenumber") String telephonenumber);

    @RequestMapping(value = "/api/user/login",method = RequestMethod.POST)
    Map<String,Object> userLogin(@Param(value = "accountname") String accountName,@Param(value = "accountpassword") String AccountPassword);

    @RequestMapping(value = "/api/user/{user_id}/update",method = RequestMethod.PUT)
    Map<String,Object> userUpdate(@PathVariable(name = "user_id")int user_id, @Param(value = "accountpassword") String accountpassword, @Param(value = "username") String username, @Param(value = "sex") String sex,@Param(value = "address") String address, @Param(value = "telephonenumber") String telephonenumber);

    @RequestMapping(value = "/api/user/{user_id}/normal",method = RequestMethod.GET)
    Map<String,Object> getUserByIdNormal(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/user/{user_id}/banned",method = RequestMethod.GET)
    Map<String,Object> getUserByIdBanned(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/user/{user_id}/apply",method = RequestMethod.GET)
    Map<String,Object> getUserByIdApply(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/user/list/normal",method = RequestMethod.GET)
    Map<String,Object> getUserListNormal();

    @RequestMapping(value = "/api/user/list/banned",method = RequestMethod.GET)
    Map<String,Object> getUserListBanned();

    @RequestMapping(value = "/api/user/list/apply",method = RequestMethod.GET)
    Map<String,Object> getUserListApply();

    @RequestMapping(value = "/api/user/register/checkby/accountname",method = RequestMethod.POST)
    Map<String,Object> userRegisterCheckbyAccount(@Param(value = " accountname")String accountname);

    @RequestMapping(value = "/api/user/register/checkby/tel",method = RequestMethod.POST)
    Map<String,Object> userRegisterCheckbyTel(@Param(value = "tel")String tel);

}
