package com.example.demo.service;

import com.example.demo.entity.Comment;

import java.util.List;

public interface ICommentService {
    Comment commentCreate(int order_id, int user_id, int product_id, String comment_content, int score);
    Comment getCommentByID(int comment_id);
    List<Comment> getCommentListByProductID(int product_id);

}
