package com.example.demo.repository;

import com.example.demo.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Integer> {
    @Transactional
    @Modifying
    @Query(value = "update productcategory set category_name=:category_name,updatedate=:updatedate where category_id=:category_id",nativeQuery = true)
    Integer categoryUpdate(@Param(value = "category_id") Integer category_id, @Param(value = "category_name")String category_name, @Param(value = "updatedate")Date updatedate);

    @Query(value = "select * from productcategory where category_name=:category_name limit 1",nativeQuery = true)
    ProductCategory categoryCheck(@Param(value = "category_name") String category_name);
}


