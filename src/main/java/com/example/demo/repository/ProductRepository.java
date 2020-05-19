package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Integer> {
    @Transactional
    @Modifying
    @Query(value = "update product set activity_id=:activity_id,category_id=:category_id,product_name=:product_name,product_price=:product_price,product_amount=:product_amount,clusternumber=:clusternumber,limitamount=:limitamount,product_introduction=:product_introduction,image_url=:image_url where product_id=:product_id",nativeQuery = true)
    Integer productUpdate(@Param(value = "product_id") int product_id, @Param(value = "activity_id")int activity_id, @Param(value = "category_id")int category_id, @Param(value = "product_name")String product_name, @Param(value = "product_price")float product_price, @Param(value = "product_amount")int product_amount, @Param(value = "clusternumber")int clusternumber, @Param(value = "limitamount")int limitamount, @Param(value = "product_introduction")String product_introduction, @Param(value = "image_url")String image_url);

    @Transactional
    @Modifying
    @Query(value = "update product set product_status=2 where product_id=:product_id",nativeQuery = true)
    Integer productCheck(@Param(value = "product_id")Integer product_id);


    @Transactional
    @Modifying
    @Query(value = "update product set product_amount=product_amount-:quantity where product_id=:product_id",nativeQuery = true)
    Integer reduceStockByProductID(@Param(value = "product_id")Integer product_id,@Param(value = "quantity")Integer quantity);


    @Query(value = "select * from product where product_status=1",nativeQuery = true)
    List<Product> getProductListCheck();

    @Query(value = "select merchant_id from product where product_id=:product_id limit 1",nativeQuery = true)
    Integer getMerchantIDByProductID(@Param(value = "product_id")Integer product_id);


    @Query(value = "select * from product where product_status=2 ",nativeQuery = true)
    List<Product> getProductListNormal();

    @Query(value = "select * from product where product_name like :keyword",nativeQuery = true)
    List<Product> getProductListByKeywordNormal(@Param(value = "keyword")String keyword);

    @Query(value = "select * from product where merchant_id=:merchant_id and product_status=2",nativeQuery = true)
    List<Product> getProductListByMerchantID(@Param(value = "merchant_id")int merchant_id);

    @Query(value = "select * from product where category_id=:category_id ",nativeQuery = true)
    List<Product> getProductListByCategoryID(@Param(value = "category_id")Integer category_id);
}
