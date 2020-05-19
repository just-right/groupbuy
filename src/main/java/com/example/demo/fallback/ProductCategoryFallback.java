package com.example.demo.fallback;

import com.example.demo.controller.IProductCategoryController;

import java.util.HashMap;
import java.util.Map;

public class ProductCategoryFallback implements IProductCategoryController {
    @Override
    public Map<String, Object> categoryCreate(String category_name) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> categoryUpdate(int category_id, String category_name) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> categoryDelete(int category_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getCategoryById(int category_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getCategoryList() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> categoryCheck(String category_name) {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
