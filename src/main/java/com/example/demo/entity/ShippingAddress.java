package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "shippingaddress")
public class ShippingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Address_ID;
    @Column(name = "user_id")
    private int User_ID;
    @Column(name = "address")
    private String Address;
    @Column(name = "receipt_contacts")
    private String Receipt_Contacts;
    @Column(name = "telephonenumber")
    private String TelephoneNumber;

    public int getAddress_ID() {
        return Address_ID;
    }

    public void setAddress_ID(int address_ID) {
        Address_ID = address_ID;
    }

    public int getUser_ID() {
        return User_ID;
    }

    public void setUser_ID(int user_ID) {
        User_ID = user_ID;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getReceipt_Contacts() {
        return Receipt_Contacts;
    }

    public void setReceipt_Contacts(String receipt_Contacts) {
        Receipt_Contacts = receipt_Contacts;
    }

    public String getTelephoneNumber() {
        return TelephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        TelephoneNumber = telephoneNumber;
    }
}

