package com.example.demo.service;

import com.example.demo.entity.Administrator;

public interface IAdministratorService {
    Administrator administratorLogin(String accountname, String accountpassword);
    void merchantCheck(int merchant_id);
    void userCheck(int user_id);
    void merchantBanned(int merchant_id);
    void userBanned(int user_id);
    void merchantRelieve(int merchant_id);
    void userRelieve(int user_id);



    void merchantDelete(int merchant_id);
    void userDelete(int user_id);
    void sendBroadcastMsg(String msg);
}
