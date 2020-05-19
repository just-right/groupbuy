//package com.example.demo.controller;
//
//import com.example.demo.entity.User;
//import com.example.demo.repository.UserRepository;
//import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
//import com.netflix.hystrix.contrib.javanica.cache.annotation.CacheKey;
//import com.netflix.hystrix.contrib.javanica.cache.annotation.CacheRemove;
//import com.netflix.hystrix.contrib.javanica.cache.annotation.CacheResult;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.context.config.annotation.RefreshScope;
//import org.springframework.cloud.stream.annotation.EnableBinding;
//import org.springframework.cloud.stream.annotation.StreamListener;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.support.MessageBuilder;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
////动态刷新 配置文件更改后 需要执行一次POST请求才能自动刷新配置文件
//@RefreshScope
//@EnableBinding(value = {Channel.class})
//@RestController
//public class TestController{
//    @Autowired
//    public RestTemplate restTemplate;
//    @Autowired
//    public UserRepository userRepository;
//    @Autowired
//    public Channel channel;
//    private static Logger logger = LoggerFactory.getLogger(UserController.class);
//
//
//    //默认超时时间2000ms,请求缓存
//    @CacheResult
//    @HystrixCommand(fallbackMethod = "testFallBack")
//    @RequestMapping(value = "/test",method = RequestMethod.GET)
//    public String test(@CacheKey("id") int id){
//        return "hello world";
//    }
//
//    public String testFallBack(){
//        return "error";
//    }
//
//    @CacheRemove(commandKey = "test")
//    @HystrixCommand
//    public String update(@CacheKey("id") User user){
//        return "ok";
//    }
//
//
//    public String userLogin(String accountName, String AccountPassword) {
//        int id = 1;
//        User user = userRepository.findById(id).get();
//        return null;
//    }
//
//
//    @StreamListener(Channel.INPUT)
//    @SendTo(Channel.OUTPUT)
//    public Object receive(Object playload){
//        logger.info(playload.toString());
//        return "thanks";
//    }
//
//    public void sendMess(){
//        channel.output().send(MessageBuilder.withPayload("send message").build());
//    }
//}
