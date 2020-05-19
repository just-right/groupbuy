package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orderstatetime")
public class OrderStatetime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Statetime_ID;
    @Column(name = "order_id")
    private int Order_ID;
    @Column(name = "order_date")
    private Date Order_Date;
    @Column(name = "pay_date")
    private Date Pay_Date;
    @Column(name = "delivery_date")
    private Date Delivery_Date;
    @Column(name = "receipt_date")
    private Date Receipt_Date;

    public int getStatetime_ID() {
        return Statetime_ID;
    }

    public void setStatetime_ID(int statetime_ID) {
        Statetime_ID = statetime_ID;
    }

    public int getOrder_ID() {
        return Order_ID;
    }

    public void setOrder_ID(int order_ID) {
        Order_ID = order_ID;
    }

    public Date getOrder_Date() {
        return Order_Date;
    }

    public void setOrder_Date(Date order_Date) {
        Order_Date = order_Date;
    }

    public Date getPay_Date() {
        return Pay_Date;
    }

    public void setPay_Date(Date pay_Date) {
        Pay_Date = pay_Date;
    }

    public Date getDelivery_Date() {
        return Delivery_Date;
    }

    public void setDelivery_Date(Date delivery_Date) {
        Delivery_Date = delivery_Date;
    }

    public Date getReceipt_Date() {
        return Receipt_Date;
    }

    public void setReceipt_Date(Date receipt_Date) {
        Receipt_Date = receipt_Date;
    }
}
