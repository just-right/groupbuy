package com.example.demo.controller;

import com.example.demo.entity.Merchant;
import com.example.demo.service.IMerchantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MerchantController implements IMerchantController {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IMerchantService merchantService;
    private static Logger logger = LoggerFactory.getLogger(MerchantController.class);

    @Override
    public Map<String, Object> merchantRegister(@Param(value = "store_name") String store_name, @Param(value = "store_contactname") String store_contactname, @Param(value = "telephonenumber") String telephonenumber, @Param(value = "address") String address, @Param(value = "accountname") String accountname, @Param(value = "accountpassword") String accountpassword) {
       // logger.info("here2");
        Merchant merchant = merchantService.merchantRegister(store_name, store_contactname, telephonenumber, address, accountname, accountpassword);
        return publicLoginAndRegister(merchant);
    }

    @Override
    public Map<String, Object> merchantLogin(String accountname, String accountpassword) {
        Map<String, Object> resMap = new HashMap<>();
       // logger.info("here");
        Merchant merchant = merchantService.merchantLogin(accountname, accountpassword);
        if(merchant==null){
            return normalErrorBack();
        }
        int accountStatus = merchant.getAccountStatus();
        switch (accountStatus) {
            case 1:
                resMap.put("code", 1);
                resMap.put("msg", "not approve");
                break;
            case 2:
                resMap = publicLoginAndRegister(merchant);
                break;
            case 3:
                resMap.put("code", 1);
                resMap.put("msg", "banned");
                break;
            default:
                resMap.put("code", 1);
                resMap.put("msg", "fail");
        }
        return resMap;

    }

    @Override
    public Map<String, Object> merchantUpdate(int merchant_id, String store_contactname, String telephonenumber, String address, String accountpassword) {
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code", 200);
        resMap.put("msg", "success");
        Merchant merchant = merchantService.merchantUpdate(merchant_id, store_contactname, telephonenumber, address, accountpassword);
        resMap.put("data", merchant);
        return resMap;
    }

    @Override
    public Map<String, Object> getMerchantByIdNormal(int merchant_id) {
        Merchant merchant = merchantService.getMerchantByIdNormal(merchant_id);
        if(merchant != null) {
            return publicGetMerchantById(merchant);
        }
        return normalErrorBack();
    }

    @Override
    public Map<String, Object> getMerchantByIdBanned(int merchant_id) {
        Merchant merchant = merchantService.getMerchantByIdBanned(merchant_id);
        if(merchant != null) {
            return publicGetMerchantById(merchant);
        }
        return normalErrorBack();
    }

    @Override
    public Map<String, Object> getMerchantByIdApply(int merchant_id) {

        Merchant merchant = merchantService.getMerchantByIdApply(merchant_id);
        if(merchant != null) {
            return publicGetMerchantById(merchant);
        }
        return normalErrorBack();
    }

    @Override
    public Map<String, Object> getMerchantListNormal() {
        List<Merchant> merchantList = merchantService.getMerchantListNormal();
        return publicGetMerchantList(merchantList);
    }

    @Override
    public Map<String, Object> getMerchantListBanned() {
        List<Merchant> merchantList = merchantService.getMerchantListBanned();
        return publicGetMerchantList(merchantList);
    }

    @Override
    public Map<String, Object> getMerchantListApply() {
        List<Merchant> merchantList = merchantService.getMerchantListApply();
        return publicGetMerchantList(merchantList);
    }

    @Override
    public Map<String, Object> merchantRegisterCheckbyAccount(String accountname) {
        Merchant merchant = merchantService.merchantRegisterCheckbyAccount(accountname);
        if (merchant!=null){
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
    public Map<String, Object> merchantRegisterCheckbyTel(String tel) {
        Merchant merchant = merchantService.merchantRegisterCheckbyTel(tel);
        if (merchant!=null){
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
    public Map<String, Object> merchantRegisterCheckbyStoreName(String storename) {
        Merchant merchant = merchantService.merchantRegisterCheckbyStoreName(storename);
        if (merchant!=null){
            Map<String, Object> resMap = new HashMap<>();
            resMap.put("code", 200);
            resMap.put("msg", "success");
            return  resMap;
        }
        else {
            return normalErrorBack();
        }
    }

    public Map<String, Object> publicLoginAndRegister(Merchant merchant) {
        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> tmpMap = new HashMap<>();
        resMap.put("code", 200);
        resMap.put("msg", "success");

        tmpMap.put("merchant_id", merchant.getMerchant_ID());
        tmpMap.put("accountname", merchant.getAccountName());
        tmpMap.put("accountpassword", merchant.getAccountPassword());

        resMap.put("data", tmpMap);

        return resMap;
    }

    public Map<String, Object> publicGetMerchantById(Merchant merchant) {
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code", 200);
        resMap.put("msg", "success");
        resMap.put("data", merchant);
        return resMap;
    }

    public Map<String, Object> publicGetMerchantList(List<Merchant> merchantList) {
        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> tmpMap = new HashMap<>();
        resMap.put("code", 200);
        resMap.put("msg", "success");
        int count = merchantList.size();
        tmpMap.put("count", count);
        tmpMap.put("rows", merchantList);
        resMap.put("data", tmpMap);
        return resMap;
    }

    public Map<String, Object> normalErrorBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
