package com.example.demo.repository;

import com.example.demo.entity.Merchant;
import com.example.demo.entity.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress,Integer> {
    @Transactional
    @Modifying
    @Query(value = "update shippingaddress set address=:address,receipt_contacts=:receipt_contacts,telephonenumber=:telephonenumber where address_id=:address_id",nativeQuery = true)
    Integer updateShippingAddress(@Param(value = "address") String address, @Param(value = "receipt_contacts") String receipt_contacts, @Param(value = "telephonenumber") String telephonenumber, @Param(value = "address_id")Integer address_id);

    @Query(value = "select * from shippingaddress where address_id=:address_id limit 1", nativeQuery = true)
    ShippingAddress getAddressByAddressId(@Param(value = "address_id") Integer address_id);

    @Query(value = "select * from shippingaddress where user_id=:user_id", nativeQuery = true)
    List<ShippingAddress> getAddressListByUserId(@Param(value = "user_id") Integer user_id);
}
