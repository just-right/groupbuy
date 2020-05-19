package com.example.demo.service;

import com.example.demo.controller.UserController;
import com.example.demo.entity.Merchant;
import com.example.demo.repository.MerchantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MerchantServiceImpl implements IMerchantService{
    @Autowired
    private MerchantRepository merchantRepository;

    private static Logger logger = LoggerFactory.getLogger(MerchantServiceImpl.class);
    @Override
    public Merchant merchantRegister(String store_name, String store_contactname, String telephonenumber, String address, String accountname, String accountpassword) {
        Date date = new Date();
        int accountLevel = 1;
        int accountStatus  = 1;
        Merchant merchant = new Merchant();

        merchant.setStore_Name(store_name);
        merchant.setStore_ContactName(store_contactname);
        merchant.setTelephoneNumber(telephonenumber);
        merchant.setAddress(address);
        merchant.setAccountName(accountname);
        merchant.setAccountPassword(accountpassword);
        merchant.setRegistrationDate(date);
        merchant.setAccountLevel(accountLevel);
        merchant.setAccountStatus(accountStatus);

        return merchantRepository.saveAndFlush(merchant);
    }

    @Override
    public Merchant merchantLogin(String accountname, String accountpassword) {
        Merchant merchant = merchantRepository.getMerchantbyNameAndPwd(accountname,accountpassword);
        logger.info(merchant.toString());
        return merchant;
    }

    @Override
    public Merchant merchantUpdate(int merchant_id, String store_contactname, String telephonenumber, String address, String accountpassword) {
        merchantRepository.updateMerchant(store_contactname,telephonenumber,address,accountpassword,merchant_id);
        Merchant merchant = merchantRepository.findById(merchant_id).get();
        return merchant;
    }

    @Override
    public Merchant getMerchantByIdNormal(int merchant_id) {
        Merchant merchant = merchantRepository.getMerchantByIdNormal(merchant_id);
        return merchant;
    }

    @Override
    public Merchant getMerchantByIdBanned(int merchant_id) {
        Merchant merchant = merchantRepository.getMerchantByIdBanned(merchant_id);
        return merchant;
    }

    @Override
    public Merchant getMerchantByIdApply(int merchant_id) {
        Merchant merchant = merchantRepository.getMerchantByIdApply(merchant_id);
        return merchant;
    }

    @Override
    public List<Merchant> getMerchantListNormal() {
        List<Merchant> merchantList = merchantRepository.getMerchantListNormal();
        return merchantList;
    }

    @Override
    public List<Merchant> getMerchantListBanned() {
        List<Merchant> merchantList = merchantRepository.getMerchantListBanned();
        return merchantList;
    }

    @Override
    public List<Merchant> getMerchantListApply() {
        List<Merchant> merchantList = merchantRepository.getMerchantListApply();
        return merchantList;
    }

    @Override
    public Merchant merchantRegisterCheckbyAccount(String accountname) {
        return merchantRepository.merchantRegisterCheckbyAccount(accountname);
    }

    @Override
    public Merchant merchantRegisterCheckbyTel(String tel) {
        return merchantRepository.merchantRegisterCheckbyTel(tel);
    }

    @Override
    public Merchant merchantRegisterCheckbyStoreName(String storename) {
        return merchantRepository.merchantRegisterCheckbyStoreName(storename);
    }
}
