package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product productCreate(int merchant_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url) {
        Product product = new Product();
        int product_Status = 1;
        product.setMerchant_ID(merchant_id);
        product.setActivity_ID(activity_id);
        product.setCategory_ID(category_id);
        product.setProduct_Name(product_name);
        product.setProduct_Price(product_price);
        product.setProduct_Amount(product_amount);
        product.setClusterNumber(clusternumber);
        product.setLimitAmount(limitamount);
        product.setProduct_Introduction(product_introduction);
        product.setImage_Url(image_url);
        product.setProduct_Status(product_Status);

        return productRepository.saveAndFlush(product);
    }

    @Override
    public Product productUpdate(int product_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url) {
        productRepository.productUpdate(product_id, activity_id, category_id, product_name, product_price, product_amount, clusternumber, limitamount, product_introduction, image_url);
        return productRepository.findById(product_id).get();
    }

    @Override
    public void productDelete(int product_id) {
        productRepository.deleteById(product_id);
    }

    @Override
    public Product productCheck(int product_id) {
        productRepository.productCheck(product_id);
        return productRepository.findById(product_id).get();
    }

    @Override
    public Product getProductById(int product_id) {
        Product product = productRepository.findById(product_id).get();
        return product;
    }

    @Override
    public List<Product> getProductListCheck() {
        List<Product> productList = productRepository.getProductListCheck();
        return productList;
    }

    @Override
    public Integer getMerchantIDByProductID(int product_id) {
        return productRepository.getMerchantIDByProductID(product_id);
    }

    @Override
    public List<Product> getProductListNoraml() {
        List<Product> productList = productRepository.getProductListNormal();
        return productList;
    }

    @Override
    public List<Product> getProductListNoramlByKeyword(String keyword) {
        List<Product> productList = productRepository.getProductListByKeywordNormal("%" + keyword + "%");
        return productList;
    }

    @Override
    public List<Product> getProductListByMerchantID(int merchant_id) {
        List<Product> productList = productRepository.getProductListByMerchantID(merchant_id);
        return productList;
    }

    @Override
    public List<Product> getProductListByCategoryID(int category_id) {
        List<Product> productList = productRepository.getProductListByCategoryID(category_id);
        return productList;
    }

    @Override
    public Product reduceStockByProductID(int product_id, int quantity) {
        productRepository.reduceStockByProductID(product_id, quantity);

        return productRepository.findById(product_id).get();
    }
}
