package com.example.demo.controller;

import com.example.demo.fallback.AdministratorFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(value = "user-service",fallback = AdministratorFallback.class)
public interface IAdministratorController {
    @RequestMapping(value = "/api/administrator/login",method = RequestMethod.POST)
    Map<String,Object> administratorLogin(@Param(value = "accountname")String accountname,@Param(value = "accountpassword")String accountpassword);

    @RequestMapping(value = "/api/administrator/{merchant_id}/merchantcheck/",method = RequestMethod.GET)
    Map<String,Object> merchantCheck(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/administrator/{user_id}/usercheck",method = RequestMethod.GET)
    Map<String,Object> userCheck(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/administrator/{merchant_id}/merchantbanned",method = RequestMethod.GET)
    Map<String,Object> merchantBanned(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/administrator/{user_id}/userbanned",method = RequestMethod.GET)
    Map<String,Object> userBanned(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/administrator/{merchant_id}/merchantrelieve",method = RequestMethod.GET)
    Map<String,Object> merchantRelieve(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/administrator/{user_id}/userrelieve",method = RequestMethod.GET)
    Map<String,Object> userRelieve(@PathVariable(value = "user_id")int user_id);


    @RequestMapping(value = "/api/administrator/{merchant_id}/merchantdelete/",method = RequestMethod.DELETE)
    Map<String,Object> merchantDelete(@PathVariable(value = "merchant_id")int merchant_id);


    @RequestMapping(value = "/api/administrator/{user_id}/userdelete",method = RequestMethod.DELETE)
    Map<String,Object> userDelete(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/administrator/send/broadcastmsg/",method = RequestMethod.POST)
    Map<String,Object> sendBroadcastMsg(@Param(value = "msg") String msg);

}
