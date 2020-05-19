package com.example.demo.service;

import com.example.demo.entity.Order;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface IOrderService {
    Order orderCreate(int user_id, int product_id,  String product_name,float product_price,float order_money,int merchant_id, String address_info, int order_amount);
    Order orderUpdate(int order_id,  int order_amount);
    void  orderDelete(int order_id);
    Order orderPay(int order_id,String address_info);
    Order orderReceipt(int order_id);
    Order orderDelivery(int order_id);
    void  orderCancel(int order_id);
    Order getOrderById(int order_id);
    List<Order> getOrderListByUserId(int user_id);
    List<Order> getOrderListByMerchantID(int merchant_id);

    List<Order> getPayOrderListByMerchantID(int merchant_id);

    List<Order> getShipOrderListByMerchantID(int merchant_id);

    List<Order> getPayOrderListByUserID(int user_id);
    List<Order> getPendingReceiptOrderListByUserID(int user_id);
    List<Order> getReceiptOrderListByUserID(int user_id);
    List<Order> getOverOrderListByUserID(int user_id);
    /*
    List<Integer> getOrderIDListByUserID(int user_id);
    List<Integer> getOrderIDListByMerchantID(int merchant_id);
    */
    Integer getProductIDByOrderID(int order_id);
    void merchantPutOSS(Order order);
    void userPutOSS(Order order);
    Map<String,String> getMessage(int id, int flag) throws IOException;
    void delMessage(String object);
    void createMessage(int userid,int orderid, String productname);
}
