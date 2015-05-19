package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

/**
 * Created by 田黄雪薇 on 15/5/16.
 */
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id")
@Entity
@Table(name = "answer")
public class Answer {
    private int id;
    private String content;
    private User user;
    private Title title;
    private Boolean correct;

    @Id
    @Column(name = "id")
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user", insertable = true, updatable = true, nullable = true)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "title", insertable = true, updatable = true, nullable = true)
    public Title getTitle() {
        return title;
    }

    public void setTitle(Title title) {
        this.title = title;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Answer answer = (Answer) o;

        if (id != answer.id) return false;
        if (content != null ? !content.equals(answer.content) : answer.content != null) return false;
        if (user != null ? !user.equals(answer.user) : answer.user != null) return false;
        if (title != null ? !title.equals(answer.title) : answer.title != null) return false;
        if (correct != null ? !correct.equals(answer.correct) : answer.correct != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (user != null ? user.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (correct != null ? correct.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "correct")
    public Boolean isCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }
}
