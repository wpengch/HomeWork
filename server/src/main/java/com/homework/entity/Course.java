package com.homework.entity;

import javax.persistence.*;
import java.util.List;

/**
 * 由 pengchao 创建于 2015-4-25-0025.
 */
@Entity
public class Course {
    private int id;
    private String name;
    private String type;
    private User teach;
    private List<User> students;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, insertable = true, updatable = true, length = 255)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "type", nullable = false, insertable = true, updatable = true, length = 255)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "teach", insertable = true, updatable = true, nullable = true)
    public User getTeach() {
        return teach;
    }

    public void setTeach(User teach) {
        this.teach = teach;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (teach != null ? teach.hashCode() : 0);
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Course course = (Course) o;

        if (id != course.id) return false;
        if (name != null ? !name.equals(course.name) : course.name != null) return false;
        if (type != null ? !type.equals(course.type) : course.type != null) return false;
        if (teach != null ? !teach.equals(course.teach) : course.teach != null) return false;

        return true;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "course_student", joinColumns = {@JoinColumn(name = "courseId")}, inverseJoinColumns = {@JoinColumn(name = "student")})
    public List<User> getStudents() {
        return students;
    }

    public void setStudents(List<User> students) {
        this.students = students;
    }
}
