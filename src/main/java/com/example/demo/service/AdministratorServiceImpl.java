package com.example.demo.service;

import com.example.demo.controller.WsController;
import com.example.demo.entity.Administrator;
import com.example.demo.repository.AdministratorRepository;
import com.example.demo.repository.MerchantRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AdministratorServiceImpl implements IAdministratorService{
    @Autowired
    private AdministratorRepository administratorRepository;
    @Autowired
    private  MerchantRepository merchantRepository;

    @Autowired
    private WsController wsController;

    @Autowired
    private UserRepository userRepository;
    @Override
    public Administrator administratorLogin(String accountname, String accountpassword) {
        Administrator administrator = administratorRepository.getAdministratorbyNameAndPwd(accountname,accountpassword);
        return administrator;
    }

    @Override
    public void merchantCheck(int merchant_id) {
        administratorRepository.merchantCheckOrRelieve(merchant_id);
    }

    @Override
    public void userCheck(int user_id) {
        administratorRepository.userCheckOrRelieve(user_id);
    }

    @Override
    public void merchantBanned(int merchant_id) {
        administratorRepository.merchantBanned(merchant_id);
        String content = "您已被封禁!";
        wsController.bannedMerchant(merchant_id,content);
    }

    @Override
    public void userBanned(int user_id) {
        administratorRepository.userBanned(user_id);
        String content = "您已被封禁!";
        wsController.bannedUser(user_id,content);
    }

    @Override
    public void merchantRelieve(int merchant_id) {
        administratorRepository.merchantCheckOrRelieve(merchant_id);
    }

    @Override
    public void userRelieve(int user_id) {
        administratorRepository.userCheckOrRelieve(user_id);
    }

    @Override
    public void merchantDelete(int merchant_id) {
        merchantRepository.deleteById(merchant_id);
    }

    @Override
    public void userDelete(int user_id) {
        userRepository.deleteById(user_id);
    }

    @Override
    public void sendBroadcastMsg(String msg) {
        wsController.broadcastMsg(msg);
    }
}
