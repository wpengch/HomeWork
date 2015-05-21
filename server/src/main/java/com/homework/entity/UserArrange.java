package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.homework.core.json.JSOGGenerator;

import javax.persistence.*;

/**
 * Created by luqiao on 15/5/21.
 */
@JsonIdentityInfo(generator = JSOGGenerator.class)
@Entity
public class UserArrange {
    private Integer id;
    private Arrange arrange;
    private User user;
    private Integer status;
    private Course course;
    private User teach;
    private Integer percent;

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "arrange", insertable = true, updatable = true, nullable = false)
    public Arrange getArrange() {
        return arrange;
    }

    public void setArrange(Arrange arrange) {
        this.arrange = arrange;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user", insertable = true, updatable = true, nullable = false)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Basic
    @Column(name = "status", nullable = true, insertable = true, updatable = true)
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "course", insertable = true, updatable = true, nullable = true)
    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "teach", insertable = true, updatable = true, nullable = false)
    public User getTeach() {
        return teach;
    }

    public void setTeach(User teach) {
        this.teach = teach;
    }

    @Basic
    @Column(name = "percent", nullable = true, insertable = true, updatable = true)
    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }
}
