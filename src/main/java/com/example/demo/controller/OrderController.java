package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.entity.OrderStatetime;
import com.example.demo.service.IOrderService;
import com.example.demo.service.IOrderStatetimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class OrderController implements IOrderController{
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderStatetimeService statetimeService;


    @Override
    public Map<String, Object> orderCreate(int user_id, int product_id, String product_name, float product_price, float order_money, int merchant_id, String address_info, int order_amount) {
        Order order = orderService.orderCreate(user_id,product_id,product_name,product_price,order_money,merchant_id,address_info,order_amount);
        OrderStatetime statetime = statetimeService.orderCreate(order.getOrder_ID());

        return publicOrder(order,statetime);
    }



    @Override
    public Map<String, Object> orderUpdate(int order_id,  int order_amount) {
        Order order = orderService.orderUpdate(order_id,order_amount);
        OrderStatetime statetime = statetimeService.getStatetimeByOrderID(order.getOrder_ID());


        return publicOrder(order,statetime);
    }

    @Override
    public Map<String, Object> orderDelete(int order_id) {
        Map<String,Object> resMap = new HashMap<>();
        orderService.orderDelete(order_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> orderPay(int order_id,String address_info) {
        Order order = orderService.orderPay(order_id,address_info);

        int merchantId = order.getMerchant_ID();

        Map<String, Object> tmpMap = new HashMap<>();

        tmpMap = restTemplate.getForObject("http://user-service/api/merchant/" + merchantId + "/normal", HashMap.class);

        if ((int) tmpMap.get("code") != 200) {
            return normalFallBack();
        }


        OrderStatetime statetime = statetimeService.orderPay(order.getOrder_ID());

        int quantity = order.getOrder_Amount();
        int productId = order.getProduct_ID();
        Map<String, Object> resMap = new HashMap<>();
        //不能使用HashMap传参 --->http://www.cnblogs.com/shoren/p/RestTemplate-problem.html
        MultiValueMap<String, Integer> map= new LinkedMultiValueMap<String, Integer>();
        map.add("quantity", quantity);

        restTemplate.postForObject("http://product-service/api/product/"+productId+"/reducestock/",map,HashMap.class);

        return publicOrder(order,statetime);
    }

    @Override
    public Map<String, Object> orderReceipt(int order_id) {
        Order order = orderService.orderReceipt(order_id);
        OrderStatetime statetime = statetimeService.orderReceipt(order.getOrder_ID());


        return publicOrder(order,statetime);
    }

    @Override
    public Map<String, Object> orderDelivery(int order_id) {
        Order order = orderService.orderDelivery(order_id);
        OrderStatetime statetime = statetimeService.orderDelivery(order.getOrder_ID());


        return publicOrder(order,statetime);
    }

    @Override
    public Map<String, Object> orderCancel(int order_id) {
        Map<String,Object> resMap = new HashMap<>();
        orderService.orderCancel(order_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> getOrderById(int order_id) {
        Order order = orderService.getOrderById(order_id);
        OrderStatetime statetime = statetimeService.getStatetimeByOrderID(order.getOrder_ID());


        return publicOrder(order,statetime);
    }

    @Override
    public Map<String, Object> getOrderListByUserId(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        List<Order> orderList = orderService.getOrderListByUserId(user_id);
        List<Order> resOrderList = new ArrayList<>();
        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByUserID(user_id);
        List<OrderStatetime> resStatetimeList = new ArrayList<>();
        List<Integer> productIdList = new ArrayList<>();
        List<Map<String,Object>> productList = new ArrayList<>();

        int count = 0;
        for (Order order: orderList){

            int merchantID = order.getMerchant_ID();
            Map<String, Object> tmpMap = new HashMap<>();

            tmpMap = restTemplate.getForObject("http://user-service/api/merchant/" + merchantID + "/normal", HashMap.class);

            if ((int) tmpMap.get("code") == 200) {
                productIdList.add(order.getProduct_ID());
                resOrderList.add(order);
                resStatetimeList.add(statetimeList.get(count));
            }

            count++;

        }

        for(Integer id: productIdList) {
            Map<String, Object> tmpMap = new HashMap<>();
            tmpMap = restTemplate.getForObject("http://product-service/api/product/" + id + "/", HashMap.class);
            productList.add((Map<String, Object>) (tmpMap.get("data")));
        }


        resMap =  publicOrderList(resOrderList,resStatetimeList);
        resMap.put("productrows",productList);
        return resMap;
    }

    @Override
    public Map<String, Object> getOrderListByMerchantID(int merchant_id) {
        List<Order> orderList = orderService.getOrderListByMerchantID(merchant_id);


        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByMerchantID(merchant_id);

        return publicOrderList(orderList,statetimeList);
    }

    @Override
    public Map<String, Object> getPayOrderListByMerchantID(int merchant_id) {
        List<Order> orderList = orderService.getPayOrderListByMerchantID(merchant_id);


        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByMerchantID(merchant_id);

        return publicOrderList(orderList,statetimeList);
    }

    @Override
    public Map<String, Object> getShipOrderListByMerchantID(int merchant_id) {
        List<Order> orderList = orderService.getShipOrderListByMerchantID(merchant_id);


        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByMerchantID(merchant_id);

        return publicOrderList(orderList,statetimeList);
    }

    @Override
    public Map<String, Object> getPayOrderListByUserID(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        List<Order> orderList = orderService.getPayOrderListByUserID(user_id);


        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByUserID(user_id);

        List<Integer> productIdList = new ArrayList<>();
        List<Map<String,Object>> productList = new ArrayList<>();

        for (Order order: orderList){
            productIdList.add(order.getProduct_ID());
        }

        for(Integer id: productIdList) {
            Map<String, Object> tmpMap = new HashMap<>();
            tmpMap = restTemplate.getForObject("http://product-service/api/product/" + id + "/", HashMap.class);
            productList.add((Map<String, Object>) (tmpMap.get("data")));
        }


        resMap =  publicOrderList(orderList,statetimeList);
        resMap.put("productrows",productList);
        return resMap;

    }

    @Override
    public Map<String, Object> getPendingReceiptOrderListByUserID(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        List<Order> orderList = orderService.getPendingReceiptOrderListByUserID(user_id);


        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByUserID(user_id);

        List<Integer> productIdList = new ArrayList<>();
        List<Map<String,Object>> productList = new ArrayList<>();

        for (Order order: orderList){
            productIdList.add(order.getProduct_ID());
        }

        for(Integer id: productIdList) {
            Map<String, Object> tmpMap = new HashMap<>();
            tmpMap = restTemplate.getForObject("http://product-service/api/product/" + id + "/", HashMap.class);
            productList.add((Map<String, Object>) (tmpMap.get("data")));
        }


        resMap =  publicOrderList(orderList,statetimeList);
        resMap.put("productrows",productList);
        return resMap;

    }

    @Override
    public Map<String, Object> getReceiptOrderListByUserID(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        List<Order> orderList = orderService.getReceiptOrderListByUserID(user_id);


        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByUserID(user_id);

        List<Integer> productIdList = new ArrayList<>();
        List<Map<String,Object>> productList = new ArrayList<>();

        for (Order order: orderList){
            productIdList.add(order.getProduct_ID());
        }

        for(Integer id: productIdList) {
            Map<String, Object> tmpMap = new HashMap<>();
            tmpMap = restTemplate.getForObject("http://product-service/api/product/" + id + "/", HashMap.class);
            productList.add((Map<String, Object>) (tmpMap.get("data")));
        }


        resMap =  publicOrderList(orderList,statetimeList);
        resMap.put("productrows",productList);
        return resMap;

    }

    @Override
    public Map<String, Object> getOverOrderListByUserID(int user_id) {
        Map<String,Object> resMap = new HashMap<>();
        List<Order> orderList = orderService.getOverOrderListByUserID(user_id);


        List<OrderStatetime> statetimeList = statetimeService.getStatetimeListByUserID(user_id);

        List<Integer> productIdList = new ArrayList<>();
        List<Map<String,Object>> productList = new ArrayList<>();

        for (Order order: orderList){
            productIdList.add(order.getProduct_ID());
        }

        for(Integer id: productIdList) {
            Map<String, Object> tmpMap = new HashMap<>();
            tmpMap = restTemplate.getForObject("http://product-service/api/product/" + id + "/", HashMap.class);
            productList.add((Map<String, Object>) (tmpMap.get("data")));
        }


        resMap =  publicOrderList(orderList,statetimeList);
        resMap.put("productrows",productList);
        return resMap;
    }

    @Override
    public Map<String, Object> getProductIDByOrderID(int order_id) {
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMapA = new HashMap<>();
        int product_id = orderService.getProductIDByOrderID(order_id);
        resMap.put("code",200);
        resMap.put("msg","success");

        tmpMapA.put("order_id",order_id);
        tmpMapA.put("product_id",product_id);

        resMap.put("data",tmpMapA);
        return resMap;
    }

    public Map<String,Object> publicOrder(Order order, OrderStatetime statetime){
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMapA = new HashMap<>();

        resMap.put("code",200);
        resMap.put("msg","success");

        tmpMapA.put("order_id",order.getOrder_ID());
        tmpMapA.put("user_id",order.getUser_ID());
        tmpMapA.put("merchant_id",order.getMerchant_ID());
        tmpMapA.put("product_id",order.getProduct_ID());


        tmpMapA.put("product_name",order.getProduct_Name());
        tmpMapA.put("product_price",order.getProduct_Price());
        tmpMapA.put("order_money",order.getOrder_Money());

        tmpMapA.put("address_info",order.getAddress_Info());
        tmpMapA.put("order_amount",order.getOrder_Amount());
        tmpMapA.put("order_status",order.getOrder_Status());

        tmpMapA.put("orderstatetime",statetime);

        resMap.put("data",tmpMapA);
        return resMap;
    }

    public Map<String,Object> publicOrderList(List<Order> orderList, List<OrderStatetime> statetimeList){
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMapA = new HashMap<>();
        List<Map<String,Object>> mapList = new ArrayList<>();

        resMap.put("code",200);
        resMap.put("msg","success");

        int count = orderList.size();
        tmpMapA.put("count",count);

        for(int i=0;i<orderList.size();i++) {
            Map<String,Object> tmpMapB = new HashMap<>();
            tmpMapB.put("order_id",orderList.get(i).getOrder_ID());
            tmpMapB.put("user_id",orderList.get(i).getUser_ID());
            tmpMapB.put("merchant_id",orderList.get(i).getMerchant_ID());
            tmpMapB.put("product_id",orderList.get(i).getProduct_ID());

            tmpMapB.put("product_name",orderList.get(i).getProduct_Name());
            tmpMapB.put("product_price",orderList.get(i).getProduct_Price());
            tmpMapB.put("order_money",orderList.get(i).getOrder_Money());



            tmpMapB.put("address_info",orderList.get(i).getAddress_Info());
            tmpMapB.put("order_amount",orderList.get(i).getOrder_Amount());
            tmpMapB.put("order_status",orderList.get(i).getOrder_Status());

            tmpMapB.put("orderstatetime",statetimeList.get(i));
            mapList.add(tmpMapB);
        }

        tmpMapA.put("rows",mapList);
        resMap.put("data",tmpMapA);
        return resMap;
    }

    @Override
    public Map<String, Object> getMessage(int id, int flag) throws IOException {
        Map<String,String> tmpMap = orderService.getMessage(id,flag);
        Map<String,Object> resMap = new HashMap<>();

        List<String> objectList = new ArrayList<>();
        List<String> msgList = new ArrayList<>();

        for (String key:tmpMap.keySet()){
            objectList.add(key);
            msgList.add(tmpMap.get(key));
        }




        resMap.put("code",200);
        resMap.put("msg","success");
        resMap.put("count",tmpMap.size());

        resMap.put("objectList",objectList);

        resMap.put("msgList",msgList);

        return resMap;
    }

    @Override
    public Map<String, Object> delMessage(String object) {
        orderService.delMessage(object);
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");

        return resMap;
    }

    @Override
    public Map<String, Object> createMessage(int userid,int orderid, String productname) {
        orderService.createMessage(userid,orderid,productname);
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");

        return resMap;
    }


    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }

}
