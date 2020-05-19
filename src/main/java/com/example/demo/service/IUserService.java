package com.example.demo.service;
import com.example.demo.entity.Merchant;
import com.example.demo.entity.User;

import java.util.List;

public interface IUserService {
    User userRegister(String accountname, String accountpassword, String username, String sex, String address, String telephonenumber);
    User userLogin(String accountname, String accountpassword);
    User userUpdate(int user_id, String accountpassword, String username, String sex, String address,String telephonenumber);

    User getUserByIdNormal(int user_id);
    User getUserByIdBanned(int user_id);
    User getUserByIdApply(int user_id);
    List<User> getUserListNormal();
    List<User> getUserListBanned();
    List<User> getUserListApply();

    User userRegisterCheckbyAccount(String accountname);
    User userRegisterCheckbyTel(String tel);
}
