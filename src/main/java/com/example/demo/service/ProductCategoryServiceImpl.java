package com.example.demo.service;

import com.example.demo.entity.ProductCategory;
import com.example.demo.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductCategoryServiceImpl implements IProductCategoryService {
    @Autowired
    private ProductCategoryRepository categoryRepository;

    @Override
    public ProductCategory categoryCreate(String category_name) {
        Date date = new Date();
        ProductCategory category = new ProductCategory();
        category.setCategory_Name(category_name);
        category.setCreateDate(date);
        category.setUpdateDate(null);
        return categoryRepository.saveAndFlush(category);
    }

    @Override
    public ProductCategory categoryUpdate(int category_id, String category_name) {
        Date date = new Date();
        categoryRepository.categoryUpdate(category_id,category_name,date);
        ProductCategory category = categoryRepository.findById(category_id).get();
        return category;
    }

    @Override
    public void categoryDelete(int category_id) {
        categoryRepository.deleteById(category_id);
    }

    @Override
    public ProductCategory getCategoryById(int category_id) {
        ProductCategory category = categoryRepository.findById(category_id).get();
        return category;
    }

    @Override
    public List<ProductCategory> getCategoryList() {
        List<ProductCategory> categoryList = categoryRepository.findAll();
        return categoryList;
    }

    @Override
    public ProductCategory categoryCheck(String category_name) {
        ProductCategory category = categoryRepository.categoryCheck(category_name);
        return category;
    }
}
