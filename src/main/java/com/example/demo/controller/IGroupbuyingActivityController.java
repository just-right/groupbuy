package com.example.demo.controller;

import com.example.demo.fallback.GroupbuyingActivityFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Date;
import java.util.Map;

@FeignClient(value = "product-service",fallback = GroupbuyingActivityFallback.class)
public interface IGroupbuyingActivityController {
    @RequestMapping(value = "/api/activity/create/",method = RequestMethod.POST)
    Map<String,Object> activityCreate(@Param(value = "activity_name")String activity_name, @Param(value = "activity_introduction")String activity_introduction, @Param(value = "begindate")Date begindate,@Param(value = "enddate")Date enddate);

    @RequestMapping(value = "/api/activity/{activity_id}/stop/",method = RequestMethod.PUT)
    Map<String,Object> activityStop(@PathVariable(value = "activity_id")int activity_id);

    @RequestMapping(value = "/api/activity/{activity_id}/update/",method = RequestMethod.PUT)
    Map<String,Object> activityUpdate(@PathVariable(value = "activity_id")int activity_id,@Param(value = "activity_name")String activity_name, @Param(value = "activity_introduction")String activity_introduction, @Param(value = "begindate")Date begindate,@Param(value = "enddate")Date enddate);


    @RequestMapping(value = "/api/activity/{activity_id}/delete/",method = RequestMethod.DELETE)
    Map<String,Object> activityDelete(@PathVariable(value = "activity_id")int activity_id);

    @RequestMapping(value = "/api/activity/{activity_id}/",method = RequestMethod.GET)
    Map<String,Object> getActivityById(@PathVariable(value = "activity_id")int activity_id);

    @RequestMapping(value = "/api/activity/list/normal/",method = RequestMethod.GET)
    Map<String,Object> getActivityListNormal();

    @RequestMapping(value = "/api/activity/list/stopped/",method = RequestMethod.GET)
    Map<String,Object> getActivityListStopped();

}
