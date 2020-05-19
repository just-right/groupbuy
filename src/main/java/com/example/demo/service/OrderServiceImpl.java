package com.example.demo.service;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.ListObjectsRequest;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.OSSObjectSummary;
import com.aliyun.oss.model.ObjectListing;
import com.example.demo.controller.WsController;
import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private WsController wsController;

    @Value("${endpoint}")
    private String endPoint ;

    @Value("${accessKeyId}")
    private String accessKeyId ;

    @Value("${accessKeySecret}")
    private String accessKeySecret ;

    @Value("${bucketName}")
    private String bucketName ;


    @Override
    public Order orderCreate(int user_id, int product_id, String product_name, float product_price, float order_money, int merchant_id, String address_info, int order_amount) {
        int order_Status = 1;
        Order order = new Order();
        order.setUser_ID(user_id);
        order.setProduct_ID(product_id);

        order.setProduct_Name(product_name);
        order.setProduct_Price(product_price);
        order.setOrder_Money(order_money);

        order.setMerchant_ID(merchant_id);
        order.setAddress_Info(address_info);
        order.setOrder_Amount(order_amount);
        order.setOrder_Status(order_Status);


        Order resorder = orderRepository.saveAndFlush(order);

        merchantPutOSS(resorder);

        String content = "订单号为:[" + resorder.getOrder_ID() + "],商品为:[" + resorder.getProduct_Name() + "]的订单，用户已[添加到购物车]!";

        wsController.sendMsgToMerchant(merchant_id, content);

        return resorder;
    }

    @Override
    public Order orderUpdate(int order_id, int order_amount) {
        Float money = orderRepository.findById(order_id).get().getProduct_Price() * order_amount;
        orderRepository.orderUpdate(order_id, order_amount, money);

        Order order = orderRepository.findById(order_id).get();
        return order;
    }

    @Override
    public void orderDelete(int order_id) {
        orderRepository.deleteById(order_id);
    }

    @Override
    public Order orderPay(int order_id, String address_info) {
        orderRepository.orderPay(order_id, address_info);
        Order order = orderRepository.findById(order_id).get();

        merchantPutOSS(order);

        String content = "订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单，用户已[付款],请发货!";

        wsController.sendMsgToMerchant(order.getMerchant_ID(), content);
        return order;
    }

    @Override
    public Order orderReceipt(int order_id) {
        orderRepository.orderReceipt(order_id);
        Order order = orderRepository.findById(order_id).get();
        merchantPutOSS(order); //提醒商家用户已确认收货
        userPutOSS(order); //提醒用户去评价
        String content = "订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单，用户已[确认收货]!";

        wsController.sendMsgToMerchant(order.getMerchant_ID(), content);
        return order;
    }

    @Override
    public Order orderDelivery(int order_id) {
        orderRepository.orderDelivery(order_id);
        Order order = orderRepository.findById(order_id).get();
        userPutOSS(order);
        return order;
    }

    @Override
    public void orderCancel(int order_id) {
        orderRepository.deleteById(order_id);
    }

    @Override
    public Order getOrderById(int order_id) {
        Order order = orderRepository.findById(order_id).get();
        return order;
    }

    @Override
    public List<Order> getOrderListByUserId(int user_id) {
        List<Order> orderList = orderRepository.getOrderListByUserID(user_id);
        return orderList;
    }

    @Override
    public List<Order> getOrderListByMerchantID(int merchant_id) {
        List<Order> orderList = orderRepository.getOrderListByMerchantID(merchant_id);
        return orderList;
    }

    @Override
    public List<Order> getPayOrderListByMerchantID(int merchant_id) {
        List<Order> orderList = orderRepository.getPayOrderListByMerchantID(merchant_id);
        return orderList;
    }

    @Override
    public List<Order> getShipOrderListByMerchantID(int merchant_id) {
        List<Order> orderList = orderRepository.getShipOrderListByMerchantID(merchant_id);
        return orderList;
    }


    @Override
    public List<Order> getPayOrderListByUserID(int user_id) {
        List<Order> orderList = orderRepository.getPayOrderListByUserID(user_id);
        return orderList;
    }

    @Override
    public List<Order> getPendingReceiptOrderListByUserID(int user_id) {
        List<Order> orderList = orderRepository.getPendingReceiptOrderListByUserID(user_id);
        return orderList;
    }

    @Override
    public List<Order> getReceiptOrderListByUserID(int user_id) {
        List<Order> orderList = orderRepository.getReceiptOrderListByUserID(user_id);
        return orderList;
    }

    @Override
    public List<Order> getOverOrderListByUserID(int user_id) {
        List<Order> orderList = orderRepository.getOverOrderListByUserID(user_id);
        return orderList;
    }


    /*
    @Override
    public List<Integer> getOrderIDListByUserID(int user_id) {
        List<Integer> list = orderRepository.getOrderIDListByUserID(user_id);
        return list;
    }

    @Override
    public List<Integer> getOrderIDListByMerchantID(int merchant_id) {
        List<Integer> list = orderRepository.getOrderIDListByMerchantID(merchant_id);
        return list;
    }
    */

    @Override
    public Integer getProductIDByOrderID(int order_id) {
        return orderRepository.getProductIDByOrderID(order_id);
    }

    @Override
    public void merchantPutOSS(Order order) {
        // Endpoint以杭州为例，其它Region请按实际情况填写。
        String endpoint = this.endPoint;
        // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
        String accessKeyId = this.accessKeyId;
        String accessKeySecret = this.accessKeySecret;
        String bucketName = this.bucketName;

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


        String objectName = "merchant-" + order.getMerchant_ID() + "/user-order-" + format.format(new Date());

        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> tmpMap = new HashMap<>();

        resMap = restTemplate.getForObject("http://user-service/api/user/" + order.getUser_ID() + "/normal", HashMap.class);

        tmpMap = (HashMap<String, Object>) resMap.get("data");
        String content = "";
        String userName = (String) tmpMap.get("accountName");
        switch (order.getOrder_Status()) {
            case 1:
                content = "订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单，用户:[" + userName + "]已[添加到购物车]!";
                break;

            case 2:
                content = "订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单，用户:[" + userName + "]已[付款],请发货!";
                break;
            case 4:
                content = "订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单，用户:[" + userName + "]已[确认收货]!";
                break;
            case 5:
                content = "订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单，用户:[" + userName + "]已[评价]!";
                break;
            default:
                break;

        }


        // 创建OSSClient实例。
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(content.getBytes()));
    }

    @Override
    public void userPutOSS(Order order) {
        // Endpoint以杭州为例，其它Region请按实际情况填写。
        String endpoint = this.endPoint;
        // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
        String accessKeyId = this.accessKeyId;
        String accessKeySecret = this.accessKeySecret;
        String bucketName = this.bucketName;

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


        String objectName = "user-" + order.getUser_ID() + "/order-" + format.format(new Date());


        String content = "";

        switch (order.getOrder_Status()) {
            case 3:
                content = "您的订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单已[发货]!";
                break;

            case 4:
                content = "您的订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单已[确认收货],请评价!";
                break;
            default:
                break;

        }


        // 创建OSSClient实例。
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(content.getBytes()));

        wsController.sendMsgToUser(order.getUser_ID(), content);
    }

    @Override
    public Map<String, String> getMessage(int id, int flag) throws IOException {
        Map<String, String> resMap = new HashMap<>();

        // Endpoint以杭州为例，其它Region请按实际情况填写。
        String endpoint = this.endPoint;
        // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
        String accessKeyId = this.accessKeyId;
        String accessKeySecret = this.accessKeySecret;
        String bucketName = this.bucketName;


        // 创建OSSClient实例。
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        String keyPrefix = "";
        // 指定前缀。
        switch (flag) {
            case 1:
                keyPrefix = "user-" + id + "/";
                break;
            case 2:
                keyPrefix = "merchant-" + id + "/";
                break;
        }

        ObjectListing objectListing = ossClient.listObjects(new ListObjectsRequest(bucketName).withPrefix(keyPrefix));


        List<OSSObjectSummary> sums = objectListing.getObjectSummaries();
        for (OSSObjectSummary s : sums) {

            String key = s.getKey();
            // ossObject包含文件所在的存储空间名称、文件名称、文件元信息以及一个输入流。
            OSSObject ossObject = ossClient.getObject(bucketName, key);

            // 读取文件内容。

            BufferedReader reader = new BufferedReader(new InputStreamReader(ossObject.getObjectContent()));
            StringBuilder builder = new StringBuilder();
            while (true) {
                String line = reader.readLine();
                if (line == null) break;
                builder.append(line);
            }
            // 数据读取完成后，获取的流必须关闭，否则会造成连接泄漏，导致请求无连接可用，程序无法正常工作。
            reader.close();

            resMap.put(key, builder.toString());


        }
        ossClient.shutdown();

        for (String key : resMap.keySet()) {
            System.out.println(key + ":" + resMap.get(key));
        }
        return resMap;
    }


    @Override
    public void delMessage(String object) {
        // Endpoint以杭州为例，其它Region请按实际情况填写。
        String endpoint = this.endPoint;
        // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
        String accessKeyId = this.accessKeyId;
        String accessKeySecret = this.accessKeySecret;
        String bucketName = this.bucketName;

        String objectName = object;

// 创建OSSClient实例。
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);

// 删除文件。
        ossClient.deleteObject(bucketName, objectName);

// 关闭OSSClient。
        ossClient.shutdown();

    }


    @Override
    public void createMessage(int userid, int orderid, String productname) {
        // Endpoint以杭州为例，其它Region请按实际情况填写。
        String endpoint = this.endPoint;
        // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
        String accessKeyId = this.accessKeyId;
        String accessKeySecret = this.accessKeySecret;
        String bucketName = this.bucketName;

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


        String objectName = "user-" + userid + "/order-" + format.format(new Date());


        String content = "您的订单号为:[" + orderid + "],商品为:[" + productname + "]的订单已[送达],请确认收货!";

        // 创建OSSClient实例。
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(content.getBytes()));

        wsController.sendMsgToUser(userid, content);

        orderRepository.orderNotified(orderid);


    }
}
