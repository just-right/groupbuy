package com.example.demo.fallback;

import com.example.demo.controller.IMerchantController;

import java.util.HashMap;
import java.util.Map;

public class MerchantFallback implements IMerchantController {
    @Override
    public Map<String, Object> merchantRegister(String store_name, String store_contactname, String telephonenumber, String address, String accountname, String accountpassword) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantLogin(String accountnme, String accountpssword) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantUpdate(int merchant_id, String store_contactname, String telephonenumber, String address, String accountpassword) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMerchantByIdNormal(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMerchantByIdBanned(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMerchantByIdApply(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMerchantListNormal() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMerchantListBanned() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMerchantListApply() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantRegisterCheckbyAccount(String accountname) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantRegisterCheckbyTel(String tel) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> merchantRegisterCheckbyStoreName(String storename) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
