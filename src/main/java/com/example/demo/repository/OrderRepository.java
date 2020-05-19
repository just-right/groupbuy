package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Transactional
    @Modifying
    @Query(value = "update productorder set order_amount=:order_amount,order_money=:money where order_id=:order_id",nativeQuery = true)
    Integer orderUpdate(@Param(value = "order_id") Integer order_id,@Param(value = "order_amount") Integer order_amount,Float money);

    @Transactional
    @Modifying
    @Query(value = "update productorder set order_status=2,address_info=:address_info where order_id=:order_id",nativeQuery = true)
    Integer orderPay(@Param(value = "order_id") Integer order_id,String address_info);

    @Transactional
    @Modifying
    @Query(value = "update productorder set order_status=4 where order_id=:order_id",nativeQuery = true)
    Integer orderReceipt(@Param(value = "order_id") Integer order_id);

    @Transactional
    @Modifying
    @Query(value = "update productorder set order_status=3 where order_id=:order_id",nativeQuery = true)
    Integer orderDelivery(@Param(value = "order_id") Integer order_id);

    @Transactional
    @Modifying
    @Query(value = "update productorder set order_status=5 where order_id=:order_id",nativeQuery = true)
    Integer orderEnd(@Param(value = "order_id") Integer order_id);

    @Transactional
    @Modifying
    @Query(value = "update productorder set order_status=6 where order_id=:order_id",nativeQuery = true)
    Integer orderNotified(@Param(value = "order_id") Integer order_id);

    @Query(value = "select * from productorder where user_id=:user_id and order_status=1",nativeQuery = true)
    List<Order> getOrderListByUserID(@Param(value = "user_id") Integer user_id);

    @Query(value = "select * from productorder where merchant_id=:merchant_id",nativeQuery = true)
    List<Order> getOrderListByMerchantID(@Param(value = "merchant_id") Integer merchant_id);

    @Query(value = "select * from productorder where merchant_id=:merchant_id and order_status=2",nativeQuery = true)
    List<Order> getPayOrderListByMerchantID(@Param(value = "merchant_id") Integer merchant_id);

    @Query(value = "select * from productorder where merchant_id=:merchant_id and order_status=3",nativeQuery = true)
    List<Order> getShipOrderListByMerchantID(@Param(value = "merchant_id") Integer merchant_id);



    @Query(value = "select * from productorder where user_id=:user_id and order_status=2",nativeQuery = true)
    List<Order> getPayOrderListByUserID(@Param(value = "user_id") Integer user_id);

    @Query(value = "select * from productorder where user_id=:user_id and order_status in (3,6)",nativeQuery = true)
    List<Order> getPendingReceiptOrderListByUserID(@Param(value = "user_id") Integer user_id);


    @Query(value = "select * from productorder where user_id=:user_id and order_status=4",nativeQuery = true)
    List<Order> getReceiptOrderListByUserID(@Param(value = "user_id") Integer user_id);

    @Query(value = "select * from productorder where user_id=:user_id and order_status=5",nativeQuery = true)
    List<Order> getOverOrderListByUserID(@Param(value = "user_id") Integer user_id);


    @Query(value = "select order_id from productorder where user_id=:user_id",nativeQuery = true)
    List<Integer> getOrderIDListByUserID(@Param(value = "user_id") Integer user_id);

    @Query(value = "select order_id from productorder where merchant_id=:merchant_id",nativeQuery = true)
    List<Integer> getOrderIDListByMerchantID(@Param(value = "merchant_id") Integer merchant_id);



    @Query(value = "select product_id from productorder where order_id=:order_id limit 1",nativeQuery = true)
    Integer getProductIDByOrderID(@Param(value = "order_id") Integer order_id);





}
