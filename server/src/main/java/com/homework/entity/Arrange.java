package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.homework.core.json.JSOGGenerator;

import javax.persistence.*;

/**
 * Created by luqiao on 15/5/20.
 */
@JsonIdentityInfo(generator=JSOGGenerator.class)
@Entity
public class Arrange {
    private Integer id;
    private String courseIds;
    private String userIds;

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "courseIds", nullable = false, insertable = true, updatable = true, length = 255)
    public String getCourseIds() {
        return courseIds;
    }

    public void setCourseIds(String courseIds) {
        this.courseIds = courseIds;
    }

    @Basic
    @Column(name = "userIds", nullable = false, insertable = true, updatable = true, length = 255)
    public String getUserIds() {
        return userIds;
    }

    public void setUserIds(String userIds) {
        this.userIds = userIds;
    }
}
