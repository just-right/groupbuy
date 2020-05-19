package com.example.demo.service;

import com.aliyun.oss.OSSClient;
import com.example.demo.controller.WsController;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Order;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImpl implements ICommentService{
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private IOrderService orderService;

    @Autowired
    private WsController wsController;

    @Autowired
    private RestTemplate template;



    @Override
    public Comment commentCreate(int order_id, int user_id, int product_id, String comment_content, int score) {
        Comment comment = new Comment();
        Date date = new Date();
        comment.setOrder_ID(order_id);
        comment.setUser_ID(user_id);
        comment.setProduct_ID(product_id);
        comment.setComment_Content(comment_content);
        comment.setScore(score);
        comment.setComment_Date(date);

        orderRepository.orderEnd(order_id);
        Order order = orderRepository.findById(order_id).get();

        orderService.merchantPutOSS(order);

        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> tmpMap = new HashMap<>();

        resMap = template.getForObject("http://product-service/api/product/get/merchantid/" + order.getProduct_ID() +"/", HashMap.class);

        tmpMap = (HashMap<String, Object>) resMap.get("data");
        int merchantId = (int)tmpMap.get("merchant_id");
        String content = "订单号为:[" + order.getOrder_ID() + "],商品为:[" + order.getProduct_Name() + "]的订单，用户已[评价]!";

        wsController.sendMsgToMerchant(merchantId,content);
        return commentRepository.saveAndFlush(comment);


    }

    @Override
    public Comment getCommentByID(int comment_id) {
        return commentRepository.findById(comment_id).get();
    }

    @Override
    public List<Comment> getCommentListByProductID(int product_id) {
        List<Comment> commentList = commentRepository.getCommentListByProductID(product_id);
        return commentList;
    }


}
