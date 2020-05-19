package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PublicServiceController implements IPublicServiceController{
    @Autowired
    private RestTemplate restTemplate;

    private static Logger logger = LoggerFactory.getLogger(PublicServiceController.class);

    @Override
    public Map<String, Object> getProductListNoraml(String address, String municipalityFlag) {
        Map<String, Object> resMap = new HashMap<>();
        //不能使用HashMap传参 --->http://www.cnblogs.com/shoren/p/RestTemplate-problem.html
        MultiValueMap<String, Object> map= new LinkedMultiValueMap<String, Object>();
        map.add("address", address);
        map.add("municipalityFlag", municipalityFlag);
        resMap = restTemplate.postForObject("http://product-service/api/forpublic/product/list/normal/",map,HashMap.class);
        return resMap;
    }

    @RequestMapping(value = "/product",method = RequestMethod.GET)
    public String zipkinTest(){
        logger.info("here start");
        return restTemplate.getForEntity("http://product-service/test",String.class).getBody();
    }



    @Override
    public Map<String, Object> getProductListNoramlByKeyword(String keyword, String address, String municipalityFlag) {
        Map<String, Object> resMap = new HashMap<>();
        //不能使用HashMap传参 --->http://www.cnblogs.com/shoren/p/RestTemplate-problem.html
        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("keyword", keyword);
        map.add("address", address);
        map.add("municipalityFlag", municipalityFlag);
        resMap = restTemplate.postForObject("http://product-service/api/forpublic/product/search/list/",map,HashMap.class);

        return resMap;
    }
}
