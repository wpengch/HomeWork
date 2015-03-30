package com.homework.service;

import com.homework.common.utils.CollectionUtil;
import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.DepartmentDao;
import com.homework.entity.Department;
import com.homework.entity.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public List<Department> departmentTree() {
        List<Department> menus = departmentDao.getAll();

        return CollectionUtil.generateTree(menus, new CollectionUtil.TreeHelper<Department, Object>() {
            @Override
            public Object getId(Department value) {
                return value.getId();
            }

            @Override
            public Object getPid(Department value) {
                return value.getPid();
            }

            @Override
            public Object getRootId() {
                return 0;
            }

            @Override
            public List<Department> getChildren(Department value) {
                return value.getChildren();
            }
        });
    }
}
