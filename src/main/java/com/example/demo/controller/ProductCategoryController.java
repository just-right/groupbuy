package com.example.demo.controller;

import com.example.demo.entity.ProductCategory;
import com.example.demo.service.IProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductCategoryController implements IProductCategoryController{
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private IProductCategoryService categoryService;

    @Override
    public Map<String, Object> categoryCreate(String category_name) {
        ProductCategory category = categoryService.categoryCreate(category_name);
        return publicCategoryCreateOrUpdate(category);
    }

    @Override
    public Map<String, Object> categoryUpdate(int category_id, String category_name) {
        ProductCategory category = categoryService.categoryUpdate(category_id,category_name);
        return publicCategoryCreateOrUpdate(category);
    }

    @Override
    public Map<String, Object> categoryDelete(int category_id) {
        Map<String,Object> resMap = new HashMap<>();
        categoryService.categoryDelete(category_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }

    @Override
    public Map<String, Object> getCategoryById(int category_id) {
        ProductCategory category = categoryService.getCategoryById(category_id);
        return publicCategoryCreateOrUpdate(category);
    }

    @Override
    public Map<String, Object> getCategoryList() {
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMapA = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        List<ProductCategory> categoryList = categoryService.getCategoryList();

        tmpMapA.put("count",categoryList.size());
        tmpMapA.put("rows",categoryList);

        resMap.put("data",tmpMapA);
        return resMap;
    }

    @Override
    public Map<String, Object> categoryCheck(String category_name) {
        Map<String,Object> resMap = new HashMap<>();
        ProductCategory category = categoryService.categoryCheck(category_name);
        if (category != null){
            resMap.put("code",200);
            resMap.put("msg","success");
            return  resMap;
        }
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }

    public Map<String, Object> publicCategoryCreateOrUpdate(ProductCategory category){
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        resMap.put("data",category);
        return resMap;
    }
}
