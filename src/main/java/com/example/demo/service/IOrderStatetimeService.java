package com.example.demo.service;

import com.example.demo.entity.OrderStatetime;

import java.util.List;

public interface IOrderStatetimeService {
    OrderStatetime getStatetimeByOrderID(int order_id);
    List<OrderStatetime> getStatetimeListByUserID(int user_id);
    List<OrderStatetime> getStatetimeListByMerchantID(int merchant_id);

    OrderStatetime orderCreate(int order_id);
    OrderStatetime orderPay(int order_id);
    OrderStatetime orderDelivery(int order_id);
    OrderStatetime orderReceipt(int order_id);
}
