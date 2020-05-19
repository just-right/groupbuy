package com.example.demo.fallback;

import com.example.demo.controller.IOrderController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class OrderFallback implements IOrderController {
    @Override
    public Map<String, Object> orderCreate(int user_id, int product_id, String product_name, float product_price, float order_money, int merchant_id, String address_info, int order_amount) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> orderUpdate(int order_id, int order_amount) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> orderDelete(int order_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> orderPay(int order_id,String address_info) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> orderReceipt(int order_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> orderDelivery(int order_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> orderCancel(int order_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getOrderById(int order_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getOrderListByUserId(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getOrderListByMerchantID(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getPayOrderListByMerchantID(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductIDByOrderID(int order_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getPayOrderListByUserID(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getPendingReceiptOrderListByUserID(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getReceiptOrderListByUserID(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getOverOrderListByUserID(int user_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMessage(int id, int flag) throws IOException {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> delMessage(String object) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getShipOrderListByMerchantID(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> createMessage(int userid,int orderid, String productname) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
