package com.homework.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.homework.core.json.JSOGGenerator;

import javax.persistence.Entity;

/**
 * Created by luqiao on 15/5/21.
 */
@JsonIdentityInfo(generator = JSOGGenerator.class)
@Entity
public class UserArrange {
    private Integer id;
}
