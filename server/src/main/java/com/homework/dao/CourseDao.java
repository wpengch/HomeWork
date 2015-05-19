package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.Course;
import org.springframework.stereotype.Repository;

/**
 * 由 pengchao 创建于 2015-4-25-0025.
 */
@Repository
public class CourseDao extends BaseDaoImpl<Course, Integer> implements BaseDao<Course, Integer> {
}
