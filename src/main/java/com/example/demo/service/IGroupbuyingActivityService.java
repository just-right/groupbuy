package com.example.demo.service;

import com.example.demo.entity.GroupbuyingActivity;

import java.util.Date;
import java.util.List;

public interface IGroupbuyingActivityService {
    GroupbuyingActivity activityCreate(String activity_name, String activity_introduction, Date begindate, Date enddate);
    GroupbuyingActivity activityStop(int activity_id);
    GroupbuyingActivity activityUpdate(int activity_id, String activity_name, String activity_introduction, Date begindate, Date enddate);
    void activityDelete(int activity_id);
    GroupbuyingActivity getActivityById(int activity_id);
    List<GroupbuyingActivity> getActivityListNormal();
    List<GroupbuyingActivity> getActivityListStopped();
}
