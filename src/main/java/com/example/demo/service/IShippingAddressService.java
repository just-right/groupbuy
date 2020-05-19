package com.example.demo.service;

import com.example.demo.entity.ShippingAddress;

import java.util.List;

public interface IShippingAddressService {
    ShippingAddress shippingAddressCreate(int user_id, String address, String receipt_contacts, String telephonenumber);
    ShippingAddress shippingAddressUpdate(int address_id, String address, String receipt_contacts, String telephonenumber);
    void shippingAddressDelete(int address_id);

    ShippingAddress getAddressByAddressId(int address_id);
    List<ShippingAddress> getAddressListByUserId(int user_id);
}
