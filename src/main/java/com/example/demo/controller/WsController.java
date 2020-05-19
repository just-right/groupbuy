package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
//@EnableScheduling
public class WsController {

    private Logger logger = LoggerFactory.getLogger(WsController.class);

    @Autowired
    private SimpMessagingTemplate  messagingTemplate;
    private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss sss");
    @MessageMapping(value = "/hello")
    @SendTo(value = "/topic/hello")
    public String reponseMsg(String msg) {
       return msg+"world";
    }



    @SendTo("/topic/hello")
    public void scheduleSendMsg() {
        Date now = new Date();
        messagingTemplate.convertAndSend("/topic/hello", df.format(now).toString());
        logger.info(now.toString());
    }


    public void sendMsgToUser(int userid,String msg) {

        messagingTemplate.convertAndSendToUser(userid+"","/user/info",msg);
        logger.info("消息已发送！");

    }

    public void sendMsgToMerchant(int merchantid,String msg) {

        messagingTemplate.convertAndSendToUser(merchantid+"","/merchant/info",msg);
        logger.info("消息已发送！");

    }

    public void bannedUser(int userid,String msg) {

        messagingTemplate.convertAndSendToUser(userid+"","/user/banned",msg);
        logger.info("消息已发送！");

    }


    public void bannedMerchant(int merchantid,String msg) {

        messagingTemplate.convertAndSendToUser(merchantid+"","/merchant/banned",msg);
        logger.info("消息已发送！");

    }





    @SendTo("/topic/broadcastMsg")
    public void broadcastMsg(String msg) {

        messagingTemplate.convertAndSend("/topic/broadcastMsg", msg);

        logger.info("消息已发送！");

    }

}
