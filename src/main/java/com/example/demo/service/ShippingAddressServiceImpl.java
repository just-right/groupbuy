package com.example.demo.service;

import com.example.demo.entity.ShippingAddress;
import com.example.demo.repository.ShippingAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingAddressServiceImpl implements IShippingAddressService{
    @Autowired
    private ShippingAddressRepository shippingAddressRepository;
    @Override
    public ShippingAddress shippingAddressCreate(int user_id, String address, String receipt_contacts, String telephonenumber) {
        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setAddress(address);
        shippingAddress.setUser_ID(user_id);
        shippingAddress.setReceipt_Contacts(receipt_contacts);
        shippingAddress.setTelephoneNumber(telephonenumber);
        return shippingAddressRepository.saveAndFlush(shippingAddress);
    }

    @Override
    public ShippingAddress shippingAddressUpdate(int address_id, String address, String receipt_contacts, String telephonenumber) {
        shippingAddressRepository.updateShippingAddress(address,receipt_contacts,telephonenumber,address_id);
        ShippingAddress shippingAddress = shippingAddressRepository.findById(address_id).get();
        return shippingAddress;
    }

    @Override
    public void shippingAddressDelete(int address_id) {
        shippingAddressRepository.deleteById(address_id);
    }

    @Override
    public ShippingAddress getAddressByAddressId(int address_id) {
        ShippingAddress address = shippingAddressRepository.getAddressByAddressId(address_id);
        return address;
    }

    @Override
    public List<ShippingAddress> getAddressListByUserId(int user_id) {
        List<ShippingAddress> addressesList = shippingAddressRepository.getAddressListByUserId(user_id);
        return addressesList;
    }
}
