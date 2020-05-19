package com.example.demo.controller;

import com.example.demo.fallback.CommentFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(value = "order-service",fallback = CommentFallback.class)
public interface ICommentController {
    @RequestMapping(value = "/api/comment/{order_id}/create",method = RequestMethod.POST)
    Map<String,Object> commentCreate(@PathVariable(value = "order_id")int order_id, @Param(value = "user_id")int user_id,@Param(value = "product_id")int product_id,@Param(value = "comment_content")String comment_content,@Param(value = "score")int score);

    @RequestMapping(value = "/api/comment/{comment_id}",method = RequestMethod.GET)
    Map<String,Object> getCommentByID(@PathVariable(value = "comment_id")int comment_id);

    @RequestMapping(value = "/api/comment/list/{product_id}",method = RequestMethod.GET)
    Map<String,Object> getCommentListByProductID(@PathVariable(value = "product_id")int product_id);

}
