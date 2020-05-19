package com.example.demo.fallback;

import com.example.demo.controller.ICommentController;

import java.util.HashMap;
import java.util.Map;

public class CommentFallback implements ICommentController {
    @Override
    public Map<String, Object> commentCreate(int order_id, int user_id, int product_id, String comment_content, int score) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getCommentByID(int comment_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getCommentListByProductID(int product_id) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
