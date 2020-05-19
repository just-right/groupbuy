package com.example.demo.controller;

import com.example.demo.fallback.ProductCategoryFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(value = "product-service",fallback = ProductCategoryFallback.class)
public interface IProductCategoryController {
    @RequestMapping(value = "/api/category/create/",method = RequestMethod.POST)
    Map<String,Object> categoryCreate(@Param(value = "category_name")String category_name);

    @RequestMapping(value = "/api/category/{category_id}/update/",method = RequestMethod.PUT)
    Map<String,Object> categoryUpdate(@PathVariable(value = "category_id")int category_id,@Param(value = "category_name")String category_name);


    @RequestMapping(value = "/api/category/{category_id}/delete/",method = RequestMethod.DELETE)
    Map<String,Object> categoryDelete(@PathVariable(value = "category_id")int category_id);

    @RequestMapping(value = "/api/category/{category_id}/",method = RequestMethod.GET)
    Map<String,Object> getCategoryById(@PathVariable(value = "category_id")int category_id);

    @RequestMapping(value = "/api/category/list/",method = RequestMethod.GET)
    Map<String,Object> getCategoryList();

    @RequestMapping(value = "/api/category/create/checkby/categoryname",method = RequestMethod.POST)
    Map<String,Object> categoryCheck(@Param(value = "category_name")String category_name);

}
