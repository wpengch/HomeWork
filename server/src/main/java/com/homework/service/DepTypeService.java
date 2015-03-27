package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.DepTypeDao;
import com.homework.dao.DepartmentDao;
import com.homework.entity.Department;
import com.homework.entity.Deptype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 由 田黄雪薇 创建于 2015-3-28-0028.
 */
@Service
@Transactional
public class DepTypeService extends BaseServiceImpl<Deptype,Integer>{
    @Autowired
    DepTypeDao depTypeDao;
    @Override
    public <D extends BaseDao<Deptype, Integer>> D getDao() {
        return (D) depTypeDao;
    }
}
