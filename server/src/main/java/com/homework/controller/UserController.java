package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Arrange;
import com.homework.entity.Course;
import com.homework.entity.Examination;
import com.homework.entity.User;
import com.homework.service.ArrangeService;
import com.homework.service.CourseService;
import com.homework.service.ExaminationService;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
@RestController
@RequestMapping("user")
public class UserController extends BaseControllerImpl<User, String> {
    @Autowired
    UserService userService;

    @Autowired
    CourseService courseService;

    @Resource
    ArrangeService arrangeService;
    @Resource
    ExaminationService examinationService;

    @Override
    public <D extends BaseService<User, String>> D getService() {
        return (D) userService;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Result updateUsers(@RequestBody List<User> userList) {
        return Result.getResult(() -> {
            userList.forEach(userService::update);
            return null;
        });
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/course")
    public Result getCourses(@PathVariable("id") String userId) {
        return Result.getResult(() -> {
            HashMap<String, Object> condition = new HashMap<>();
            condition.put("teach", userId);
            return courseService.getList(condition);
        });
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/{id}/work")
    public Result getWorks(@PathVariable("id") String userId,@RequestParam(value = "status", required = false, defaultValue = "0")Integer status) {
        return Result.getResult(() -> {
            List<Arrange> arranges = arrangeService.getAll();
            List<Course> courses = courseService.getAll();
            List<String> courseIds = courses.stream().filter(course -> course.getStudents().stream().filter(user -> Objects.equals(user.getId(), userId)).count() > 0).map(course1 ->  course1.getId().toString()).collect(Collectors.toList());
            List<Examination> examinations = new ArrayList<>();
            for (Arrange arrange : arranges) {
                List<String> users = arrange.getUserIds() != null ? Arrays.asList(arrange.getUserIds().split(",")) : new ArrayList<>();
                if (users.contains(userId)) {
                    examinations.add(arrange.getExamination());
                }
                final List<String> ids = arrange.getCourseIds() != null ? Arrays.asList(arrange.getCourseIds().split(",")) :
                        new ArrayList<>();
                if(courseIds.stream().filter(s1 -> ids.stream().filter(s2 -> Objects.equals(s1,s2)).count() > 0).count() > 0){
                    examinations.add(arrange.getExamination());
                }
            }
            examinations = examinations.stream().distinct().collect(Collectors.toList());
            return examinations;
        });
    }
}
