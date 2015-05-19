package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.homework.core.json.JSOGGenerator;

import javax.persistence.*;
import java.util.List;

/**
 * Created by luqiao on 15/5/19.
 */
@JsonIdentityInfo(generator=JSOGGenerator.class)
@Entity
public class BigTitle {
    private Integer id;
    private String name;
    private Integer type;
    private Integer percent;
    private Examination examination;
    private List<Title> titles;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, insertable = true, updatable = true, length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "type", nullable = false, insertable = true, updatable = true)
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Basic
    @Column(name = "percent", nullable = false, insertable = true, updatable = true)
    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "examination", insertable = true, updatable = true, nullable = true)
    public Examination getExamination() {
        return examination;
    }

    public void setExamination(Examination examination) {
        this.examination = examination;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "BigTitle_Title", joinColumns = {@JoinColumn(name = "bigId")}, inverseJoinColumns = {@JoinColumn(name = "titleId")})
    public List<Title> getTitles() {
        return titles;
    }

    public void setTitles(List<Title> titles) {
        this.titles = titles;
    }
}
