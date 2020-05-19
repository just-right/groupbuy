package com.example.demo.controller;

import com.example.demo.fallback.PublicServiceFallback;

import feign.Param;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(value = "public-service",fallback = PublicServiceFallback.class)
public interface IPublicServiceController {
    //公共服务
    @RequestMapping(value = "/api/product/list/normal/",method = RequestMethod.POST)
    Map<String,Object> getProductListNoraml(@Param(value = "address") String address,@Param(value = "municipalityFlag") String municipalityFlag);

    @RequestMapping(value = "/api/product/search/list/",method = RequestMethod.POST)
    Map<String,Object> getProductListNoramlByKeyword(@Param(value = "keyword")String keyword,@Param(value = "address") String address,@Param(value = "municipalityFlag") String municipalityFlag);

}
