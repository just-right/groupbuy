package com.example.demo.service;

import com.example.demo.entity.ProductCategory;

import java.util.List;


public interface IProductCategoryService {
     ProductCategory categoryCreate(String category_name);
     ProductCategory categoryUpdate(int category_id, String category_name);
     void categoryDelete(int category_id);
     ProductCategory getCategoryById(int category_id);
     List<ProductCategory> getCategoryList();
     ProductCategory categoryCheck(String category_name);
}
