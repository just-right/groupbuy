package com.example.demo.controller;

import com.example.demo.entity.ShippingAddress;
import com.example.demo.service.IShippingAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ShippingAddressController implements IShippingAddressController{
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IShippingAddressService shippingAddressService;

    @Override
    public Map<String, Object> shippingAddressCreate(int user_id, String address, String receipt_contacts, String telephonenumber) {
        ShippingAddress shippingAddress = shippingAddressService.shippingAddressCreate(user_id,address,receipt_contacts,telephonenumber);
        return publicCreateAndUpdate(shippingAddress);
    }

    @Override
    public Map<String, Object> shippingAddressUpdate(int address_id, String address, String receipt_contacts, String telephonenumber) {
        ShippingAddress shippingAddress = shippingAddressService.shippingAddressUpdate(address_id,address,receipt_contacts,telephonenumber);
        return publicCreateAndUpdate(shippingAddress);
    }

    @Override
    public Map<String, Object> shippingAddressDelete(int address_id) {
        Map<String,Object> resMap = new HashMap<>();
        shippingAddressService.shippingAddressDelete(address_id);
        resMap.put("code",200);
        resMap.put("msg","success");

        return resMap;
    }

    @Override
    public Map<String, Object> getAddressByAddressId(int address_id) {
        Map<String,Object> resMap = new HashMap<>();
        ShippingAddress address = shippingAddressService.getAddressByAddressId(address_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        resMap.put("data",address);
        return resMap;
    }

    @Override
    public Map<String, Object> getAddressListByUserId(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMap = new HashMap<>();
        List<ShippingAddress> addressList = shippingAddressService.getAddressListByUserId(user_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        int count = addressList.size();
        tmpMap.put("count",count);
        tmpMap.put("rows",addressList);
        resMap.put("data",tmpMap);
        return resMap;
    }

    public Map<String, Object> publicCreateAndUpdate(ShippingAddress shippingAddress){
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        resMap.put("data",shippingAddress);
        return resMap;
    }
}
