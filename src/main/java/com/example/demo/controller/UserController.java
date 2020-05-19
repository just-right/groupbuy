package com.example.demo.controller;
import com.example.demo.entity.User;
import com.example.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RefreshScope
public class UserController implements IUserController{
    @Autowired
    public RestTemplate restTemplate;
    @Autowired
    public IUserService userService;



    @Override
    public Map<String, Object> userRegister(String accountname, String accountpassword, String username, String sex, String address, String telephonenumber) {
        User user = userService.userRegister(accountname,accountpassword,username,sex,address,telephonenumber);
        return publicLoginAndRegister(user);
    }

    @Override
    public Map<String, Object> userLogin(String accountname, String accountpassword) {

        Map<String, Object> resMap = new HashMap<>();
        User user = userService.userLogin(accountname,accountpassword);
        if(user==null){
            return normalErrorBack();
        }
        int userStatus = user.getUserStatus();
        switch (userStatus){
            case 1:
                resMap.put("code",1);
                resMap.put("msg","not approve");
                break;
            case 2:
                resMap = publicLoginAndRegister(user);
                break;
            case 3:
                resMap.put("code",1);
                resMap.put("msg","banned");
                break;
            default:
                resMap.put("code",1);
                resMap.put("msg","fail");
        }
        return resMap;
    }

    @Override
    public Map<String, Object> userUpdate(int user_id, String accountpassword, String username, String sex, String address, String telephonenumber) {
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        User user = userService.userUpdate(user_id,accountpassword,username,sex,address,telephonenumber);
        resMap.put("data",user);
        return resMap;
    }

    @Override
    public Map<String, Object> getUserByIdNormal(int user_id) {
        User user = userService.getUserByIdNormal(user_id);
        if(user!=null) {
            return publicGetUserById(user);
        }
        return normalErrorBack();
    }

    @Override
    public Map<String, Object> getUserByIdBanned(int user_id) {
        User user = userService.getUserByIdBanned(user_id);
        if (user!=null) {
            return publicGetUserById(user);
        }
        return normalErrorBack();
    }

    @Override
    public Map<String, Object> getUserByIdApply(int user_id) {
        User user = userService.getUserByIdApply(user_id);
        if (user!=null) {
            return publicGetUserById(user);
        }
        return normalErrorBack();
    }

    @Override
    public Map<String, Object> getUserListNormal() {
        List<User> userList = userService.getUserListNormal();
        return publicGetUserList(userList);
    }

    @Override
    public Map<String, Object> getUserListBanned() {
        List<User> userList = userService.getUserListBanned();
        return publicGetUserList(userList);
    }

    @Override
    public Map<String, Object> getUserListApply() {
        List<User> userList = userService.getUserListApply();
        return publicGetUserList(userList);
    }

    @Override
    public Map<String, Object> userRegisterCheckbyAccount(String accountname) {
        User user = userService.userRegisterCheckbyAccount(accountname);
        if (user!=null){
            Map<String, Object> resMap = new HashMap<>();
            resMap.put("code", 200);
            resMap.put("msg", "success");
            return  resMap;
        }
        else {
            return normalErrorBack();
        }
    }

    @Override
    public Map<String, Object> userRegisterCheckbyTel(String tel) {
        User user = userService.userRegisterCheckbyTel(tel);
        if (user!=null){
            Map<String, Object> resMap = new HashMap<>();
            resMap.put("code", 200);
            resMap.put("msg", "success");
            return  resMap;
        }
        else {
            return normalErrorBack();
        }
    }

    public Map<String, Object> publicLoginAndRegister(User user){
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");

        tmpMap.put("user_id",user.getUser_ID());
        tmpMap.put("accountname",user.getAccountName());
        tmpMap.put("accountpassword",user.getAccountPassword());

        resMap.put("data",tmpMap);

        return resMap;
    }


    public Map<String, Object> publicGetUserById(User user){
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        resMap.put("data",user);
        return resMap;
    }

    public Map<String, Object> publicGetUserList(List<User> userList){
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        int count = userList.size();
        tmpMap.put("count",count);
        tmpMap.put("rows",userList);
        resMap.put("data",tmpMap);
        return resMap;
    }

    public Map<String, Object> normalErrorBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
