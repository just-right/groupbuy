package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int User_ID;
    @Column(name = "account_name")
    private String AccountName;
    @Column(name = "account_password")
    private String AccountPassword;
    @Column(name = "username")
    private String UserName;
    @Column(name = "sex")
    private String Sex;
    @Column(name = "address")
    private String Address;
    @Column(name = "telephonenumber")
    private String TelephoneNumber;
    @Column(name = "registration_date")
    private Date RegistrationDate;
    @Column(name = "user_level")
    private int UserLevel;
    @Column(name = "user_status")
    private int UserStatus;

    public int getUser_ID() {
        return User_ID;
    }

    public void setUser_ID(int user_ID) {
        User_ID = user_ID;
    }

    public String getAccountName() {
        return AccountName;
    }

    public void setAccountName(String accountName) {
        AccountName = accountName;
    }

    public String getAccountPassword() {
        return AccountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        AccountPassword = accountPassword;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getSex() {
        return Sex;
    }

    public void setSex(String sex) {
        Sex = sex;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getTelephoneNumber() {
        return TelephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        TelephoneNumber = telephoneNumber;
    }

    public Date getRegistrationDate() {
        return RegistrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        RegistrationDate = registrationDate;
    }

    public int getUserLevel() {
        return UserLevel;
    }

    public void setUserLevel(int userLevel) {
        UserLevel = userLevel;
    }

    public int getUserStatus() {
        return UserStatus;
    }

    public void setUserStatus(int userStatus) {
        UserStatus = userStatus;
    }
}
