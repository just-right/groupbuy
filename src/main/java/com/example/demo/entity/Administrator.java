package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "administrator")
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Administrator_ID;
    @Column(name = "account_name")
    private String AccountName;
    @Column(name = "account_password")
    private String AccountPassword;

    public int getAdministrator_ID() {
        return Administrator_ID;
    }

    public void setAdministrator_ID(int administrator_ID) {
        Administrator_ID = administrator_ID;
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
}
