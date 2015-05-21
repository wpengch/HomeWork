package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.homework.core.json.JSOGGenerator;

import javax.persistence.*;
import java.util.List;

/**
 * Created by 田黄雪薇 on 15/4/26.
 */
@JsonIdentityInfo(generator=JSOGGenerator.class)
@Entity
public class Title {
    private Integer id;
    private String content;
    private String description;
    private User initiator;
    private List<Answer> answers;
    private List<BigTitle> titles;
    private String answer;
    private Integer percent;
    private Integer respondentId;

    public Title() {

    }

    public Title(Integer id) {
        this.id = id;
    }

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
    @Column(name = "content", nullable = false, insertable = true, updatable = true, length = 255)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "description", nullable = true, insertable = true, updatable = true, length = 255)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "initiator", insertable = true, updatable = true, nullable = false)
    public User getInitiator() {
        return initiator;
    }

    public void setInitiator(User initiator) {
        this.initiator = initiator;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Title title = (Title) o;

        if (id != null ? !id.equals(title.id) : title.id != null) return false;
        if (content != null ? !content.equals(title.content) : title.content != null) return false;
        if (description != null ? !description.equals(title.description) : title.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Answer.class, mappedBy = "title")
    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "BigTitle_Title", joinColumns = {@JoinColumn(name = "titleId")}, inverseJoinColumns = {@JoinColumn(name = "bigId")})
    public List<BigTitle> getTitles() {
        return titles;
    }

    public void setTitles(List<BigTitle> titles) {
        this.titles = titles;
    }

    @Transient
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Transient
    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    @Transient
    public Integer getRespondentId() {
        return respondentId;
    }

    public void setRespondentId(Integer respondentId) {
        this.respondentId = respondentId;
    }
}
