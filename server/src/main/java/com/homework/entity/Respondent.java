package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.homework.core.json.JSOGGenerator;

import javax.persistence.*;

/**
 * Created by luqiao on 15/5/21.
 */
@JsonIdentityInfo(generator = JSOGGenerator.class)
@Entity
public class Respondent {
    private Integer id;
    private Integer userArrangeId;
    private Integer bigTitleId;
    private Integer titleId;
    private Integer percent;
    private String answer;


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
    @Column(name = "userArrangeId", nullable = true, insertable = true, updatable = true)
    public Integer getUserArrangeId() {
        return userArrangeId;
    }


    public void setUserArrangeId(Integer userArrangeId) {
        this.userArrangeId = userArrangeId;
    }

    @Basic
    @Column(name = "bigTitleId", nullable = true, insertable = true, updatable = true)
    public Integer getBigTitleId() {
        return bigTitleId;
    }

    public void setBigTitleId(Integer bigTitleId) {
        this.bigTitleId = bigTitleId;
    }

    @Basic
    @Column(name = "titleId", nullable = true, insertable = true, updatable = true)
    public Integer getTitleId() {
        return titleId;
    }

    public void setTitleId(Integer titleId) {
        this.titleId = titleId;
    }

    @Basic
    @Column(name = "percent", nullable = true, insertable = true, updatable = true)
    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    @Basic
    @Column(name = "answer", nullable = true, insertable = true, updatable = true)
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
