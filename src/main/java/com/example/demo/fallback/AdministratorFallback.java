package com.example.demo.fallback;

import com.example.demo.controller.IAdministratorController;

import java.util.HashMap;
import java.util.Map;

public class AdministratorFallback implements IAdministratorController {
    @Override
    public Map<String, Object> administratorLogin(String accountnme, String accountpssword) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantCheck(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userCheck(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantBanned(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userBanned(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantRelieve(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userRelieve(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantDelete(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> userDelete(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> sendBroadcastMsg(String msg) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
