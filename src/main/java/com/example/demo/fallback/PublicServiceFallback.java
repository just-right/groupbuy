package com.example.demo.fallback;

import com.example.demo.controller.IPublicServiceController;

import java.util.HashMap;
import java.util.Map;

public class PublicServiceFallback implements IPublicServiceController {
    @Override
    public Map<String, Object> getProductListNoraml(String address, String municipalityFlag) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductListNoramlByKeyword(String keyword, String address, String municipalityFlag) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
