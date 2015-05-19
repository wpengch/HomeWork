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
public class Examination {
    private Integer id;
    private String name;
    private Integer percent;
    private User initiator;
    private List<BigTitle> titles;

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


    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "initiator", insertable = true, updatable = true, nullable = true)
    public User getInitiator() {
        return initiator;
    }

    public void setInitiator(User initiator) {
        this.initiator = initiator;
    }

    @Basic
    @Column(name = "percent", nullable = false, insertable = true, updatable = true)
    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = BigTitle.class, mappedBy = "examination")
    public List<BigTitle> getTitles() {
        return titles;
    }

    public void setTitles(List<BigTitle> titles) {
        this.titles = titles;
    }
}
