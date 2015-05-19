package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Course;
import com.homework.entity.User;
import com.homework.service.CourseService;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 由 pengchao 创建于 2015-4-25-0025.
 */
@RestController
@RequestMapping(value = "course")
public class CourseController extends BaseControllerImpl<Course, Integer> implements BaseController<Course, Integer> {
    @Autowired
    CourseService courseService;
    @Resource
    UserService userService;

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


    @ResponseBody
    @RequestMapping(value = "/{id}/student/{stuId}", method = RequestMethod.DELETE)
    public Result deleteStudent(@PathVariable("id") Integer courseId, @PathVariable("stuId") String studentId) {
        return Result.getResult(() -> {
            Course course = courseService.getById(courseId);
            course.getStudents().removeIf(user -> user.getId().equals(studentId));
            return courseService.update(course);
        });
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/student/{stuId}", method = RequestMethod.POST)
    public Result addStudent(@PathVariable("id") Integer courseId, @PathVariable("stuId") String studentId) {
        return Result.getResult(() -> {
            Course course = courseService.getById(courseId);
            User user = userService.getById(studentId);
            course.getStudents().add(user);
            return courseService.update(course);
        });
    }
}
