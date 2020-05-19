package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "productorder")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Order_ID;
    @Column(name = "user_id")
    private int User_ID;
    @Column(name = "merchant_id")
    private int Merchant_ID;
    @Column(name = "product_id")
    private int Product_ID;
    @Column(name = "product_name")
    private String Product_Name;

    @Column(name = "product_price")
    private float Product_Price;


    @Column(name = "order_money")
    private float Order_Money;

    @Column(name = "address_info")
    private String Address_Info;
    @Column(name = "order_amount")
    private int Order_Amount;
    @Column(name = "order_status")
    private int Order_Status;

    public int getOrder_ID() {
        return Order_ID;
    }

    public void setOrder_ID(int order_ID) {
        Order_ID = order_ID;
    }

    public int getUser_ID() {
        return User_ID;
    }

    public void setUser_ID(int user_ID) {
        User_ID = user_ID;
    }

    public int getMerchant_ID() {
        return Merchant_ID;
    }

    public void setMerchant_ID(int merchant_ID) {
        Merchant_ID = merchant_ID;
    }

    public int getProduct_ID() {
        return Product_ID;
    }

    public void setProduct_ID(int product_ID) {
        Product_ID = product_ID;
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

    public float getOrder_Money() {
        return Order_Money;
    }

    public void setOrder_Money(float order_Money) {
        Order_Money = order_Money;
    }

    public String getAddress_Info() {
        return Address_Info;
    }

    public void setAddress_Info(String address_Info) {
        Address_Info = address_Info;
    }

    public int getOrder_Amount() {
        return Order_Amount;
    }

    public void setOrder_Amount(int order_Amount) {
        Order_Amount = order_Amount;
    }

    public int getOrder_Status() {
        return Order_Status;
    }

    public void setOrder_Status(int order_Status) {
        Order_Status = order_Status;
    }
}
