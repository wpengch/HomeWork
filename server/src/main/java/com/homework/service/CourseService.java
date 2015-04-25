package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.CourseDao;
import com.homework.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 由 pengchao 创建于 2015-4-25-0025.
 */
@Service
@Transactional
public class CourseService extends BaseServiceImpl<Course, Integer> implements BaseService<Course, Integer> {
    @Autowired
    CourseDao courseDao;

    @Override
    public <D extends BaseDao<Course, Integer>> D getDao() {
        return (D) courseDao;
    }
}
