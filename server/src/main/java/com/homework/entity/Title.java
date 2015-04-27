package com.homework.entity;

import javax.persistence.*;

/**
 * Created by 田黄雪薇 on 15/4/26.
 */
@Entity
public class Title {
    private Integer id;
    private String content;
    private String description;
    private User initiator;

    public void setId(int id) {
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
}
