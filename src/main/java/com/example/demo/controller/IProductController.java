package com.example.demo.controller;

import com.example.demo.fallback.ProductFallback;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(value = "product-service",fallback = ProductFallback.class)
public interface IProductController {
    @RequestMapping(value = "/api/product/create/",method = RequestMethod.POST)
    Map<String,Object> productCreate(@Param(value = "merchant_id")int merchant_id,@Param(value = "activity_id")int activity_id,@Param(value = "category_id")int category_id,@Param(value = "product_name")String product_name,@Param(value = "product_price")float product_price,@Param(value = "product_amount")int product_amount,@Param(value = "clusternumber")int clusternumber,@Param(value = "limitamount")int limitamount,@Param(value = "product_introduction")String product_introduction,@Param(value = "image_url")String image_url);

    @RequestMapping(value = "/api/product/{product_id}/update/",method = RequestMethod.PUT)
    Map<String,Object> productUpdate(@PathVariable(value = "product_id")int product_id, @Param(value = "activity_id")int activity_id, @Param(value = "category_id")int category_id, @Param(value = "product_name")String product_name, @Param(value = "product_price")float product_price, @Param(value = "product_amount")int product_amount, @Param(value = "clusternumber")int clusternumber, @Param(value = "limitamount")int limitamount, @Param(value = "product_introduction")String product_introduction, @Param(value = "image_url")String image_url);

    @RequestMapping(value = "/api/product/{product_id}/delete/",method = RequestMethod.DELETE)
    Map<String,Object> productDelete(@PathVariable(value = "product_id")int product_id);


    @RequestMapping(value = "/api/product/{product_id}/check/",method = RequestMethod.PUT)
    Map<String,Object> productCheck(@PathVariable(value = "product_id")int product_id);

    @RequestMapping(value = "/api/product/{product_id}/",method = RequestMethod.GET)
    Map<String,Object> getProductById(@PathVariable(value = "product_id")int product_id);


    @RequestMapping(value = "/api/product/list/check/",method = RequestMethod.GET)
    Map<String,Object> getProductListCheck();

    @RequestMapping(value = "/api/product/get/list/{category_id}/",method = RequestMethod.POST)
    Map<String,Object> getProductListByCategoryID(@PathVariable(value = "category_id")int category_id,@Param(value = "address") String address,@Param(value = "municipalityFlag") String municipalityFlag);

    @RequestMapping(value = "/api/product/get/merchantid/{product_id}/",method = RequestMethod.GET)
    Map<String,Object> getMerchantIDByProductID(@PathVariable(value = "product_id")int product_id);


    @RequestMapping(value = "/api/product/{product_id}/reducestock/",method = RequestMethod.POST)
    Map<String,Object> reduceStockByProductID(@PathVariable(value = "product_id")int product_id,@Param(value = "quantity") int quantity);


    //公共服务
    @RequestMapping(value = "/api/forpublic/product/list/normal/",method = RequestMethod.POST)
    Map<String,Object> getProductListNoraml(@Param(value = "address") String address,@Param(value = "municipalityFlag") String municipalityFlag);

    @RequestMapping(value = "/api/forpublic/product/list/normal/foradmin",method = RequestMethod.GET)
    Map<String,Object> getProductListNoramlForAdmin();

    @RequestMapping(value = "/api/forpublic/product/search/list/",method = RequestMethod.POST)
    Map<String,Object> getProductListNoramlByKeyword(@Param(value = "keyword") String keyword, @Param(value = "address") String address, @Param(value = "municipalityFlag") String municipalityFlag);

    @RequestMapping(value = "/api/product/list/by/merchant/{merchant_id}/",method = RequestMethod.GET)
    Map<String,Object> getProductListByMerchantID(@PathVariable(value = "merchant_id")int merchant_id);
}
