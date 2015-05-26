package com.homework.extend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

/**
 * 由 pengchao 创建于 2015-4-25-0025.
 */
public class HibernateObjectMapper extends ObjectMapper {
    public HibernateObjectMapper() {
        registerModule(new Hibernate4Module());
    }
}