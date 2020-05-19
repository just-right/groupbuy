package com.example.demo.service;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public User userRegister(String accountname, String accountpassword, String username, String sex, String address, String telephonenumber) {
        Date date = new Date();
        int userLevel = 1;
        int userStatus  = 1;
        User user = new User();
        user.setAccountName(accountname);
        user.setAccountPassword(accountpassword);
        user.setUserName(username);
        user.setSex(sex);
        user.setAddress(address);
        user.setTelephoneNumber(telephonenumber);
        user.setRegistrationDate(date);
        user.setUserLevel(userLevel);
        user.setUserStatus(userStatus);

        return userRepository.saveAndFlush(user);
    }

    @Override
    public User userLogin(String accountname, String accountpassword) {
        User user = userRepository.getUserbyNameAndPwd(accountname,accountpassword);
        return user;
    }

    @Override
    public User userUpdate(int user_id, String accountpassword, String username, String sex, String address, String telephonenumber) {
        userRepository.updateMerchant(accountpassword,username,sex,address,telephonenumber,user_id);
        User user = userRepository.findById(user_id).get();
        return user;
    }

    @Override
    public User getUserByIdNormal(int user_id) {
        User user = userRepository.getUserByIdNormal(user_id);
        return user;
    }

    @Override
    public User getUserByIdBanned(int user_id) {
        User user = userRepository.getUserByIdBanned(user_id);
        return user;
    }

    @Override
    public User getUserByIdApply(int user_id) {
        User user = userRepository.getUserByIdApply(user_id);
        return user;
    }

    @Override
    public List<User> getUserListNormal() {
        List<User> userList = userRepository.getUserListNormal();
        return userList;
    }

    @Override
    public List<User> getUserListBanned() {
        List<User> userList = userRepository.getUserListBanned();
        return userList;
    }

    @Override
    public List<User> getUserListApply() {
        List<User> userList = userRepository.getUserListApply();
        return userList;
    }

    @Override
    public User userRegisterCheckbyAccount(String accountname) {
        return userRepository.userRegisterCheckbyAccount(accountname);
    }

    @Override
    public User userRegisterCheckbyTel(String tel) {
        return userRepository.userRegisterCheckbyTel(tel);
    }
}
