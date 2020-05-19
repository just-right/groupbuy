package com.example.demo.fallback;

import com.example.demo.controller.IProductController;

import java.util.HashMap;
import java.util.Map;

public class ProductFallback implements IProductController {

    @Override
    public Map<String, Object> productCreate(int merchant_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> productUpdate(int product_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> productDelete(int product_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> productCheck(int product_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductById(int product_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductListCheck() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getMerchantIDByProductID(int product_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductListNoraml(String address, String municipalityFlag) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductListNoramlByKeyword(String keyword, String address,String municipalityFlag) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductListByMerchantID(int merchant_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductListByCategoryID(int category_id, String address, String municipalityFlag) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> reduceStockByProductID(int product_id, int quantity) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getProductListNoramlForAdmin() {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
