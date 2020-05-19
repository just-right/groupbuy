package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Comment_ID;
    @Column(name = "order_id")
    private int Order_ID;
    @Column(name = "user_id")
    private int User_ID;
    @Column(name = "product_id")
    private int Product_ID;
    @Column(name = "comment_content")
    private String Comment_Content;
    @Column(name = "score")
    private int Score;
    @Column(name = "comment_date")
    private Date Comment_Date;

    public int getComment_ID() {
        return Comment_ID;
    }

    public void setComment_ID(int comment_ID) {
        Comment_ID = comment_ID;
    }

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

    public int getProduct_ID() {
        return Product_ID;
    }

    public void setProduct_ID(int product_ID) {
        Product_ID = product_ID;
    }

    public String getComment_Content() {
        return Comment_Content;
    }

    public void setComment_Content(String comment_Content) {
        Comment_Content = comment_Content;
    }

    public int getScore() {
        return Score;
    }

    public void setScore(int score) {
        Score = score;
    }

    public Date getComment_Date() {
        return Comment_Date;
    }

    public void setComment_Date(Date comment_Date) {
        Comment_Date = comment_Date;
    }
}
