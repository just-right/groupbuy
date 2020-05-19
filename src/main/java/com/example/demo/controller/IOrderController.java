package com.example.demo.controller;

import com.example.demo.fallback.OrderFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;
import java.util.Map;

@FeignClient(value = "order-service",fallback = OrderFallback.class)
public interface IOrderController {
    @RequestMapping(value = "/api/order/{user_id}/create",method = RequestMethod.POST)
    Map<String,Object> orderCreate(@PathVariable(value = "user_id")int user_id, @Param(value = "product_id")int product_id,@Param(value = "product_name")String product_name,@Param(value = "product_price")float product_price,@Param(value = "order_money")float order_money,@Param(value = "merchant_id")int merchant_id,@Param(value = "address_info")String address_info,@Param(value = "order_amount")int order_amount);

    @RequestMapping(value = "/api/order/{order_id}/update",method = RequestMethod.PUT)
    Map<String,Object> orderUpdate(@PathVariable(value = "order_id")int order_id,@Param(value = "order_amount")int order_amount);

    @RequestMapping(value = "/api/order/{order_id}/delete",method = RequestMethod.DELETE)
    Map<String,Object> orderDelete(@PathVariable(value = "order_id")int order_id);


    @RequestMapping(value = "/api/order/{order_id}/pay",method = RequestMethod.PUT)
    Map<String,Object> orderPay(@PathVariable(value = "order_id")int order_id, @Param(value = "address_info")String address_info);

    @RequestMapping(value = "/api/order/{order_id}/receipt",method = RequestMethod.GET)
    Map<String,Object> orderReceipt(@PathVariable(value = "order_id")int order_id);

    @RequestMapping(value = "/api/order/{order_id}/delivery",method = RequestMethod.GET)
    Map<String,Object> orderDelivery(@PathVariable(value = "order_id")int order_id);

    @RequestMapping(value = "/api/order/{order_id}/cancel",method = RequestMethod.DELETE)
    Map<String,Object> orderCancel(@PathVariable(value = "order_id")int order_id);

    @RequestMapping(value = "/api/order/{order_id}",method = RequestMethod.GET)
    Map<String,Object> getOrderById(@PathVariable(value = "order_id")int order_id);

    @RequestMapping(value = "/api/order/list/by/user/{user_id}",method = RequestMethod.GET)
    Map<String,Object> getOrderListByUserId(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/order/list/by/merchant/{merchant_id}",method = RequestMethod.GET)
    Map<String,Object> getOrderListByMerchantID(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/order/paylist/by/userid/{user_id}",method = RequestMethod.GET)
    Map<String,Object> getPayOrderListByUserID(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/order/paylist/by/merchant/{merchant_id}",method = RequestMethod.GET)
    Map<String,Object> getPayOrderListByMerchantID(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/order/shiplist/by/merchant/{merchant_id}",method = RequestMethod.GET)
    Map<String,Object> getShipOrderListByMerchantID(@PathVariable(value = "merchant_id")int merchant_id);

    @RequestMapping(value = "/api/order/pendingreceiptlist/by/userid/{user_id}",method = RequestMethod.GET)
    Map<String,Object> getPendingReceiptOrderListByUserID(@PathVariable(value = "user_id")int user_id);


    @RequestMapping(value = "/api/order/overlist/by/userid/{user_id}",method = RequestMethod.GET)
    Map<String,Object> getOverOrderListByUserID(@PathVariable(value = "user_id")int user_id);

    @RequestMapping(value = "/api/order/receiptlist/by/userid/{user_id}",method = RequestMethod.GET)
    Map<String,Object> getReceiptOrderListByUserID(@PathVariable(value = "user_id")int user_id);



    @RequestMapping(value = "/api/order/get/productid/{order_id}",method = RequestMethod.GET)
    Map<String,Object> getProductIDByOrderID(@PathVariable(value = "order_id")int order_id);

    @RequestMapping(value = "/api/order/get/message/",method = RequestMethod.POST)
    Map<String,Object> getMessage(@Param(value = "id")int id, @Param(value = "flag")int flag) throws IOException;

    @RequestMapping(value = "/api/order/message/delete/",method = RequestMethod.DELETE)
    Map<String,Object> delMessage(@Param(value = "object")String object);

    @RequestMapping(value = "/api/order/message/create/",method = RequestMethod.POST)
    Map<String,Object> createMessage(@Param(value = "userid")int userid,@Param(value = "orderid")int orderid,@Param(value = "productname")String productname);
}

