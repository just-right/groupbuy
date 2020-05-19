package com.example.demo.entity;


public class Product {

    private int Product_ID;

    private int Merchant_ID;

    private int Activity_ID;

    private int Category_ID;

    private String Product_Name;

    private float Product_Price;

    private int Product_Amount;

    private int ClusterNumber;

    private int LimitAmount;

    private String Product_Introduction;

    private String Image_Url;

    private int Product_Status;

    public int getProduct_ID() {
        return Product_ID;
    }

    public void setProduct_ID(int product_ID) {
        Product_ID = product_ID;
    }

    public int getMerchant_ID() {
        return Merchant_ID;
    }

    public void setMerchant_ID(int merchant_ID) {
        Merchant_ID = merchant_ID;
    }

    public int getActivity_ID() {
        return Activity_ID;
    }

    public void setActivity_ID(int activity_ID) {
        Activity_ID = activity_ID;
    }

    public int getCategory_ID() {
        return Category_ID;
    }

    public void setCategory_ID(int category_ID) {
        Category_ID = category_ID;
    }

    public String getProduct_Name() {
        return Product_Name;
    }

    public void setProduct_Name(String product_Name) {
        Product_Name = product_Name;
    }

    public float getProduct_Price() {
        return Product_Price;
    }

    public void setProduct_Price(float product_Price) {
        Product_Price = product_Price;
    }

    public int getProduct_Amount() {
        return Product_Amount;
    }

    public void setProduct_Amount(int product_Amount) {
        Product_Amount = product_Amount;
    }

    public int getClusterNumber() {
        return ClusterNumber;
    }

    public void setClusterNumber(int clusterNumber) {
        ClusterNumber = clusterNumber;
    }

    public int getLimitAmount() {
        return LimitAmount;
    }

    public void setLimitAmount(int limitAmount) {
        LimitAmount = limitAmount;
    }

    public String getProduct_Introduction() {
        return Product_Introduction;
    }

    public void setProduct_Introduction(String product_Introduction) {
        Product_Introduction = product_Introduction;
    }

    public String getImage_Url() {
        return Image_Url;
    }

    public void setImage_Url(String image_Url) {
        Image_Url = image_Url;
    }

    public int getProduct_Status() {
        return Product_Status;
    }

    public void setProduct_Status(int product_Status) {
        Product_Status = product_Status;
    }
}
