package com.example.demo.fallback;

import com.example.demo.controller.IShippingAddressController;

import java.util.HashMap;
import java.util.Map;

public class ShippingAddressFallback implements IShippingAddressController {
    @Override
    public Map<String, Object> shippingAddressCreate(int user_id, String address, String receipt_contacts, String telephonenumber) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> shippingAddressUpdate(int address_id, String address, String receipt_contacts, String telephonenumber) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> shippingAddressDelete(int address_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getAddressByAddressId(int address_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getAddressListByUserId(int user_id) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
