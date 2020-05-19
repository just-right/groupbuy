package com.example.demo.repository;

import com.example.demo.entity.GroupbuyingActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface GroupbuyingActivityRepository extends JpaRepository<GroupbuyingActivity,Integer> {
    @Transactional
    @Modifying
    @Query(value = "update groupbuyingactivity set activity_status=2 where activity_id=:activity_id",nativeQuery = true)
    Integer activityStop(@Param(value = "activity_id") Integer activity_id);

    @Query(value = "select * from groupbuyingactivity where activity_status=1",nativeQuery = true)
    List<GroupbuyingActivity> getActivityListNormal();

    @Transactional
    @Modifying
    @Query(value = "update groupbuyingactivity set activity_name=:activity_name,activity_introduction=:activity_introduction,begindate=:begindate,enddate=:enddate  where activity_id=:activity_id",nativeQuery = true)
    Integer activityUpdate(@Param(value = "activity_id") Integer activity_id, @Param(value = "activity_name")String activity_name, @Param(value = "activity_introduction")String activity_introduction, @Param(value = "begindate")Date begindate, @Param(value = "enddate")Date enddate);


    @Query(value = "select * from groupbuyingactivity where activity_status=2",nativeQuery = true)
    List<GroupbuyingActivity> getActivityListStopped();
}
