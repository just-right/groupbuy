package com.example.demo.controller;

import com.example.demo.fallback.MerchantFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(value = "user-service",fallback = MerchantFallback.class)
public interface IMerchantController {
    @RequestMapping(value = "/api/merchant/register/",method = RequestMethod.POST)
    Map<String,Object> merchantRegister(@Param(value = "store_name")String store_name,@Param(value = "store_contactname")String store_contactname,@Param(value = "telephonenumber")String telephonenumber,@Param(value = "address")String address,@Param(value = "accountname")String accountname,@Param(value = "accountpassword")String accountpassword);

    @RequestMapping(value = "/api/merchant/login/",method = RequestMethod.POST)
    Map<String,Object> merchantLogin(@Param(value = "accountname")String accountname,@Param(value = "accountpassword")String accountpassword);

    @RequestMapping(value = "/api/merchant/{merchant_id}/update",method = RequestMethod.PUT)
    Map<String,Object> merchantUpdate(@PathVariable(value = "merchant_id")int merchant_id,@Param(value = "store_contactname")String store_contactname, @Param(value = "telephonenumber")String telephonenumber, @Param(value = "address")String address, @Param(value = "accountpassword")String accountpassword);

    @RequestMapping(value = "/api/merchant/{merchant_id}/normal",method = RequestMethod.GET)
    Map<String,Object> getMerchantByIdNormal(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/merchant/{merchant_id}/banned",method = RequestMethod.GET)
    Map<String,Object> getMerchantByIdBanned(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/merchant/{merchant_id}/apply",method = RequestMethod.GET)
    Map<String,Object> getMerchantByIdApply(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/merchant/list/normal",method = RequestMethod.GET)
    Map<String,Object> getMerchantListNormal();

    @RequestMapping(value = "/api/merchant/list/banned",method = RequestMethod.GET)
    Map<String,Object> getMerchantListBanned();

    @RequestMapping(value = "/api/merchant/list/apply",method = RequestMethod.GET)
    Map<String,Object> getMerchantListApply();

    @RequestMapping(value = "api/merchant/register/checkby/accountname",method = RequestMethod.POST)
    Map<String,Object> merchantRegisterCheckbyAccount(@Param(value = "accountname")String accountname);

    @RequestMapping(value = "api/merchant/register/checkby/tel",method = RequestMethod.POST)
    Map<String,Object> merchantRegisterCheckbyTel(@Param(value = "tel")String tel);

    @RequestMapping(value = "api/merchant/register/checkby/storename",method = RequestMethod.POST)
    Map<String,Object> merchantRegisterCheckbyStoreName(@Param(value = "storename")String storename);
}
