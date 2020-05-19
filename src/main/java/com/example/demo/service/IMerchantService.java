package com.example.demo.service;

import com.example.demo.entity.Merchant;

import java.util.List;

public interface IMerchantService {
    Merchant merchantRegister(String store_name, String store_contactname, String telephonenumber, String address, String accountname, String accountpassword);
    Merchant merchantLogin(String accountname, String accountpassword);
    Merchant merchantUpdate(int merchant_id, String store_contactname, String telephonenumber, String address, String accountpassword);

    Merchant getMerchantByIdNormal(int merchant_id);
    Merchant getMerchantByIdBanned(int merchant_id);
    Merchant getMerchantByIdApply(int merchant_id);
    List<Merchant> getMerchantListNormal();
    List<Merchant> getMerchantListBanned();
    List<Merchant> getMerchantListApply();
    Merchant merchantRegisterCheckbyAccount(String accountname);
    Merchant merchantRegisterCheckbyTel(String tel);
    Merchant merchantRegisterCheckbyStoreName(String storename);

}
