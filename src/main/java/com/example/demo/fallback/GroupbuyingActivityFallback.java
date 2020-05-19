package com.example.demo.fallback;

import com.example.demo.controller.IGroupbuyingActivityController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class GroupbuyingActivityFallback implements IGroupbuyingActivityController {
    @Override
    public Map<String, Object> activityCreate(String activity_name, String activity_introduction, Date begindate, Date enddate) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> activityStop(int activity_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> activityUpdate(int activity_id, String activity_name, String activity_introduction, Date begindate, Date enddate) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> activityDelete(int activity_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getActivityById(int activity_id) {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getActivityListNormal() {
        return normalFallBack();
    }

    @Override
    public Map<String, Object> getActivityListStopped() {
        return normalFallBack();
    }

    public Map<String, Object> normalFallBack(){
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("code",1);
        resMap.put("msg","fail");
        return resMap;
    }
}
