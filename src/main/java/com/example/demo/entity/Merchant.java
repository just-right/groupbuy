package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "merchant")
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Merchant_ID;
    @Column(name = "store_name")
    private String Store_Name;
    @Column(name = "store_contactname")
    private String Store_ContactName;
    @Column(name = "telephonenumber")
    private String TelephoneNumber;
    @Column(name = "address")
    private String Address;
    @Column(name = "account_name")
    private String AccountName;
    @Column(name = "account_password")
    private String AccountPassword;
    @Column(name = "registration_date")
    private Date RegistrationDate;
    @Column(name = "account_level")
    private int AccountLevel;
    @Column(name = "account_status")
    private int AccountStatus;

    public int getMerchant_ID() {
        return Merchant_ID;
    }

    public void setMerchant_ID(int merchant_ID) {
        Merchant_ID = merchant_ID;
    }

    public String getStore_Name() {
        return Store_Name;
    }

    public void setStore_Name(String store_Name) {
        Store_Name = store_Name;
    }

    public String getStore_ContactName() {
        return Store_ContactName;
    }

    public void setStore_ContactName(String store_ContactName) {
        Store_ContactName = store_ContactName;
    }

    public String getTelephoneNumber() {
        return TelephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        TelephoneNumber = telephoneNumber;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
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

    public Date getRegistrationDate() {
        return RegistrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        RegistrationDate = registrationDate;
    }

    public int getAccountLevel() {
        return AccountLevel;
    }

    public void setAccountLevel(int accountLevel) {
        AccountLevel = accountLevel;
    }

    public int getAccountStatus() {
        return AccountStatus;
    }

    public void setAccountStatus(int accountStatus) {
        AccountStatus = accountStatus;
    }
}
