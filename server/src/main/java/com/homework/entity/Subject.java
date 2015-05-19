package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.homework.core.json.JSOGGenerator;

/**
 * Created by pengchaowang on 15/4/12.
 */
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class Subject {
    private int id;
    private String name;
    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Subject subject = (Subject) o;

        return id == subject.id && !(name != null ? !name.equals(subject.name) : subject.name != null) && !(description != null ? !description.equals(subject.description) : subject.description != null);

    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }
}
