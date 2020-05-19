package com.example.demo.service;

import com.example.demo.entity.Product;

import java.util.List;

public interface IProductService {
    Product productCreate(int merchant_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url);
    Product productUpdate(int product_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url);
    void productDelete(int product_id);
    Product productCheck(int product_id);
    Product getProductById(int product_id);
    List<Product> getProductListCheck();
    Integer getMerchantIDByProductID(int product_id);
    List<Product> getProductListNoraml();
    List<Product> getProductListNoramlByKeyword(String keyword);

    List<Product> getProductListByMerchantID(int merchant_id);

    List<Product> getProductListByCategoryID(int category_id);

    Product reduceStockByProductID(int product_id, int quantity);
}
