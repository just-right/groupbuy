package com.example.demo.repository;


import com.example.demo.entity.OrderStatetime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface OrderStatetimeRepository extends JpaRepository<OrderStatetime,Integer> {

    @Query(value = "select * from orderstatetime where order_id=:order_id limit 1",nativeQuery = true)
    OrderStatetime getStatetimeByOrderID(@Param(value = "order_id") Integer order_id);


    @Transactional
    @Modifying
    @Query(value = "update orderstatetime set pay_date=:pay_date where order_id=:order_id",nativeQuery = true)
    Integer orderPay(@Param(value = "pay_date") Date pay_date,@Param(value = "order_id") Integer order_id);

    @Transactional
    @Modifying
    @Query(value = "update orderstatetime set delivery_date=:delivery_date where order_id=:order_id",nativeQuery = true)
    Integer orderDelivery(@Param(value = "delivery_date") Date delivery_date,@Param(value = "order_id") Integer order_id);

    @Transactional
    @Modifying
    @Query(value = "update orderstatetime set receipt_date=:receipt_date where order_id=:order_id",nativeQuery = true)
    Integer orderReceipt(@Param(value = "receipt_date") Date receipt_date,@Param(value = "order_id") Integer order_id);
}
