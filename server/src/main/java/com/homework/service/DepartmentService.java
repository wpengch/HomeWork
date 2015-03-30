package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.DepartmentDao;
import com.homework.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 2015-3-28-0028.
 */
@Service
@Transactional
public class DepartmentService  extends BaseServiceImpl<Department,Integer>{
    @Autowired
    DepartmentDao departmentDao;
    @Override
    public <D extends BaseDao<Department, Integer>> D getDao() {
        return (D) departmentDao;
    }
}
