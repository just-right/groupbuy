package com.example.demo.controller;

import com.example.demo.entity.Administrator;
import com.example.demo.service.IAdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AdministratorController implements IAdministratorController{
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IAdministratorService administratorService;

    @Override
    public Map<String, Object> administratorLogin(String accountname, String accountpassword) {
        Map<String,Object> resMap = new HashMap<>();
        Administrator administrator = administratorService.administratorLogin(accountname,accountpassword);
        resMap.put("code",200);
        resMap.put("msg","success");
        if(administrator!=null) {
            resMap.put("data", administrator);
        }
        else {
            return normalErrorBack();
        }
        return resMap;
    }

    @Override
    public Map<String, Object> merchantCheck(int merchant_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.merchantCheck(merchant_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> userCheck(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.userCheck(user_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> merchantBanned(int merchant_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.merchantBanned(merchant_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> userBanned(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.userBanned(user_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> merchantRelieve(int merchant_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.merchantRelieve(merchant_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> userRelieve(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.userRelieve(user_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> merchantDelete(int merchant_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.merchantDelete(merchant_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> userDelete(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.userDelete(user_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    public Map<String, Object> normalErrorBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }

    @Override
    public Map<String, Object> sendBroadcastMsg(String msg) {
        Map<String,Object> resMap = new HashMap<>();
        administratorService.sendBroadcastMsg(msg);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }
}
