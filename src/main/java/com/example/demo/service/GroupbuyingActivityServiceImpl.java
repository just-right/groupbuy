package com.example.demo.service;

import com.example.demo.entity.GroupbuyingActivity;
import com.example.demo.repository.GroupbuyingActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class GroupbuyingActivityServiceImpl implements IGroupbuyingActivityService{

    @Autowired
    private GroupbuyingActivityRepository activityRepository;
    @Override
    public GroupbuyingActivity activityCreate(String activity_name, String activity_introduction, Date begindate, Date enddate) {
        GroupbuyingActivity activity = new GroupbuyingActivity();
        int activity_status = 1;
        activity.setActivity_Name(activity_name);
        activity.setActivity_Introduction(activity_introduction);
        activity.setBeginDate(begindate);
        activity.setEndDate(enddate);
        activity.setActivity_Status(activity_status);

        return activityRepository.saveAndFlush(activity);
    }

    @Override
    public GroupbuyingActivity activityStop(int activity_id) {
        activityRepository.activityStop(activity_id);
        GroupbuyingActivity activity = activityRepository.findById(activity_id).get();
        return activity;
    }

    @Override
    public GroupbuyingActivity activityUpdate(int activity_id, String activity_name, String activity_introduction, Date begindate, Date enddate) {
       activityRepository.activityUpdate(activity_id,activity_name,activity_introduction,begindate,enddate);

       return activityRepository.findById(activity_id).get();
    }

    @Override
    public void activityDelete(int activity_id) {
        activityRepository.deleteById(activity_id);
    }


    @Override
    public GroupbuyingActivity getActivityById(int activity_id) {
        GroupbuyingActivity activity = activityRepository.findById(activity_id).get();
        return activity;
    }

    @Override
    public List<GroupbuyingActivity> getActivityListNormal() {
        List<GroupbuyingActivity> activityList = activityRepository.getActivityListNormal();
        return activityList;
    }

    @Override
    public List<GroupbuyingActivity> getActivityListStopped() {
        List<GroupbuyingActivity> activityList = activityRepository.getActivityListStopped();
        return activityList;
    }
}
