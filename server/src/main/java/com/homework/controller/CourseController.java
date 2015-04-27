package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Course;
import com.homework.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 由 pengchao 创建于 2015-4-25-0025.
 */
@RestController
@RequestMapping(value = "course")
public class CourseController extends BaseControllerImpl<Course, Integer> implements BaseController<Course, Integer> {
    @Autowired
    CourseService courseService;

    @Override
    public <D extends BaseService<Course, Integer>> D getService() {
        return (D) courseService;
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.GET)
    public Result getAll() {
        return Result.getResult(() -> {
            List<Course> courses = getService().getAll();
            return courses;
        });
    }

}
