package com.homework.controller;

import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Department;
import com.homework.entity.User;
import com.homework.service.DepartmentService;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *  2015-3-27-0027.
 */
@RestController
@RequestMapping("department")
public class DepartmentController extends BaseControllerImpl<Department,Integer> {
    @Autowired
    DepartmentService departmentService;

    @Override
    public <D extends BaseService<Department, Integer>> D getService() {
        return (D) departmentService;
    }
}
