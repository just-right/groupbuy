package com.example.demo.controller;

import com.example.demo.entity.Comment;
import com.example.demo.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CommentController implements ICommentController{
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ICommentService commentService;
    @Override
    public Map<String, Object> commentCreate(int order_id, int user_id, int product_id, String comment_content, int score) {
        Comment comment = commentService.commentCreate(order_id,user_id,product_id,comment_content,score);
        return publiComment(comment);
    }

    @Override
    public Map<String, Object> getCommentByID(int comment_id) {
        Comment comment = commentService.getCommentByID(comment_id);
        return publiComment(comment);
    }

    @Override
    public Map<String, Object> getCommentListByProductID(int product_id) {
        List<Comment> commentList = commentService.getCommentListByProductID(product_id);
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMapA = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");

        tmpMapA.put("count",commentList.size());
        tmpMapA.put("rows",commentList);

        resMap.put("data",tmpMapA);
        return resMap;
    }

    public Map<String,Object> publiComment(Comment comment){
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        resMap.put("data",comment);
        return resMap;
    }
}
