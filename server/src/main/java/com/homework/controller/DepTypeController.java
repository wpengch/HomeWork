package com.homework.controller;

import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Department;
import com.homework.entity.Deptype;
import com.homework.service.DepTypeService;
import com.homework.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
@RestController
@RequestMapping("department")
public class DepTypeController extends BaseControllerImpl<Deptype,Integer> {
    @Autowired
    DepTypeService depTypeService;

    @Override
    public <D extends BaseService<Deptype, Integer>> D getService() {
        return (D) depTypeService;
    }
}
