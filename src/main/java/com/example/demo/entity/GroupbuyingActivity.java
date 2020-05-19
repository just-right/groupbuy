package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "groupbuyingactivity")
public class GroupbuyingActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Activity_ID;
    @Column(name = "activity_name")
    private String Activity_Name;
    @Column(name = "activity_introduction")
    private String Activity_Introduction;
    @Column(name = "begindate")
    private Date BeginDate;
    @Column(name = "enddate")
    private Date EndDate;
    @Column(name = "activity_status")
    private int Activity_Status;

    public int getActivity_ID() {
        return Activity_ID;
    }

    public void setActivity_ID(int activity_ID) {
        Activity_ID = activity_ID;
    }

    public String getActivity_Name() {
        return Activity_Name;
    }

    public void setActivity_Name(String activity_Name) {
        Activity_Name = activity_Name;
    }

    public String getActivity_Introduction() {
        return Activity_Introduction;
    }

    public void setActivity_Introduction(String activity_Introduction) {
        Activity_Introduction = activity_Introduction;
    }

    public Date getBeginDate() {
        return BeginDate;
    }

    public void setBeginDate(Date beginDate) {
        BeginDate = beginDate;
    }

    public Date getEndDate() {
        return EndDate;
    }

    public void setEndDate(Date endDate) {
        EndDate = endDate;
    }

    public int getActivity_Status() {
        return Activity_Status;
    }

    public void setActivity_Status(int activity_Status) {
        Activity_Status = activity_Status;
    }
}
