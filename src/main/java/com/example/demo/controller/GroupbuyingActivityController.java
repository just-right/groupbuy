package com.example.demo.controller;

import com.example.demo.entity.GroupbuyingActivity;
import com.example.demo.service.IGroupbuyingActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class GroupbuyingActivityController implements IGroupbuyingActivityController{
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IGroupbuyingActivityService activityService;

    @Override
    public Map<String, Object> activityCreate(String activity_name, String activity_introduction, Date begindate, Date enddate) {
        GroupbuyingActivity activity = activityService.activityCreate(activity_name,activity_introduction,begindate,enddate);
        return publicActivityCreateOrStop(activity);
    }

    @Override
    public Map<String, Object> activityStop(int activity_id) {
        GroupbuyingActivity activity = activityService.activityStop(activity_id);
        return publicActivityCreateOrStop(activity);

    }

    @Override
    public Map<String, Object> activityUpdate(int activity_id, String activity_name, String activity_introduction, Date begindate, Date enddate) {
        GroupbuyingActivity activity = activityService.activityUpdate(activity_id,activity_name,activity_introduction,begindate,enddate);
        return publicActivityCreateOrStop(activity);
    }

    @Override
    public Map<String, Object> activityDelete(int activity_id) {
        Map<String,Object> resMap = new HashMap<>();
        activityService.activityDelete(activity_id);
        resMap.put("code",200);
        resMap.put("msg","success");
        return resMap;
    }


    @Override
    public Map<String, Object> getActivityById(int activity_id) {
        GroupbuyingActivity activity = activityService.getActivityById(activity_id);
        return publicActivityCreateOrStop(activity);
    }

    @Override
    public Map<String, Object> getActivityListNormal() {
        List<GroupbuyingActivity> activityList = activityService.getActivityListNormal();
        return publicGetActivityList(activityList);
    }

    @Override
    public Map<String, Object> getActivityListStopped() {
        List<GroupbuyingActivity> activityList = activityService.getActivityListStopped();
        return publicGetActivityList(activityList);
    }

    public Map<String, Object> publicActivityCreateOrStop(GroupbuyingActivity activity){
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        resMap.put("data",activity);
        return resMap;
    }


    public Map<String, Object> publicGetActivityList(List<GroupbuyingActivity> activityList){
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> tmpMap = new HashMap<>();
        resMap.put("code",200);
        resMap.put("msg","success");
        int count = activityList.size();
        tmpMap.put("count",count);
        tmpMap.put("rows",activityList);
        resMap.put("data",tmpMap);
        return resMap;
    }
}
