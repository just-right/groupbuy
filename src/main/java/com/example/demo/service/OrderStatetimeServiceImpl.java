package com.example.demo.service;

import com.example.demo.entity.OrderStatetime;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.OrderStatetimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderStatetimeServiceImpl implements IOrderStatetimeService{
    @Autowired
    private OrderStatetimeRepository statetimeRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public OrderStatetime getStatetimeByOrderID(int order_id) {
        OrderStatetime statetime =statetimeRepository.getStatetimeByOrderID(order_id);
        return statetime;
    }

    @Override
    public List<OrderStatetime> getStatetimeListByUserID(int user_id) {
        List<Integer> orderIDLists = orderRepository.getOrderIDListByUserID(user_id);

        List<OrderStatetime> statetimeList = new ArrayList<>();
        for(Integer orderID:orderIDLists){
            statetimeList.add(statetimeRepository.getStatetimeByOrderID(orderID));
        }
        return statetimeList;
    }

    @Override
    public List<OrderStatetime> getStatetimeListByMerchantID(int merchant_id) {
        List<Integer> orderIDLists = orderRepository.getOrderIDListByMerchantID(merchant_id);

        List<OrderStatetime> statetimeList = new ArrayList<>();
        for(Integer orderID:orderIDLists){
            statetimeList.add(statetimeRepository.getStatetimeByOrderID(orderID));
        }
        return statetimeList;
    }

    @Override
    public OrderStatetime orderCreate(int order_id) {
        OrderStatetime statetime = new OrderStatetime();
        Date  date = new Date();
        statetime.setOrder_ID(order_id);
        statetime.setOrder_Date(date);
        return statetimeRepository.saveAndFlush(statetime);
    }

    @Override
    public OrderStatetime orderPay(int order_id) {
        Date date = new Date();
        statetimeRepository.orderPay(date,order_id);
        return statetimeRepository.getStatetimeByOrderID(order_id);
    }

    @Override
    public OrderStatetime orderDelivery(int order_id) {
        Date date = new Date();
        statetimeRepository.orderDelivery(date,order_id);
        return statetimeRepository.getStatetimeByOrderID(order_id);
    }

    @Override
    public OrderStatetime orderReceipt(int order_id) {
        Date date = new Date();
        statetimeRepository.orderReceipt(date,order_id);
        return statetimeRepository.getStatetimeByOrderID(order_id);
    }
}
