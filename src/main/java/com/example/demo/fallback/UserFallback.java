package com.example.demo.fallback;

import com.example.demo.controller.IUserController;

import java.util.HashMap;
import java.util.Map;

public class UserFallback implements IUserController {


    @Override
    public Map<String, Object> userRegister(String accountname, String accountpassword, String username, String sex, String address, String telephonenumber) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userLogin(String accountname, String accountpassword) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userUpdate(int user_id, String accountpassword, String username, String sex, String address, String telephonenumber) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getUserByIdNormal(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getUserByIdBanned(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getUserByIdApply(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getUserListNormal() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getUserListBanned() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getUserListApply() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userRegisterCheckbyAccount(String accountname) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userRegisterCheckbyTel(String tel) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
