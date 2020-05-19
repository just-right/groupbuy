package com.example.demo.controller;

import com.example.demo.fallback.ShippingAddressFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;
@FeignClient(value = "user-service",fallback = ShippingAddressFallback.class)
public interface IShippingAddressController {
    @RequestMapping(value = "/api/shippingaddress/create",method = RequestMethod.POST)
    Map<String,Object> shippingAddressCreate(@Param(value = "user_id")int user_id,@Param(value = "address")String address,@Param(value = "receipt_contacts")String receipt_contacts,@Param(value = "telephonenumber")String telephonenumber);

    @RequestMapping(value = "/api/shippingaddress/{address_id}/update",method = RequestMethod.PUT)
    Map<String,Object> shippingAddressUpdate(@PathVariable(value = "address_id")int address_id,@Param(value = "address")String address,@Param(value = "receipt_contacts")String receipt_contacts,@Param(value = "telephonenumber")String telephonenumber);

    @RequestMapping(value = "/api/shippingaddress/{address_id}/delete",method = RequestMethod.DELETE)
    Map<String,Object> shippingAddressDelete(@PathVariable(value = "address_id")int address_id);

    @RequestMapping(value = "/api/address/{address_id}",method = RequestMethod.GET)
    Map<String,Object> getAddressByAddressId(@PathVariable(value = "address_id")int address_id);

    @RequestMapping(value = "/api/address/list/{user_id}",method = RequestMethod.GET)
    Map<String,Object> getAddressListByUserId(@PathVariable(value = "user_id")int user_id);
}
