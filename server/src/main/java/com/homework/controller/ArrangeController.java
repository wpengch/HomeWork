package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Arrange;
import com.homework.entity.Course;
import com.homework.entity.User;
import com.homework.entity.UserArrange;
import com.homework.service.ArrangeService;
import com.homework.service.CourseService;
import com.homework.service.UserArrangeService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by luqiao on 15/5/20.
 */
@RestController
@RequestMapping(value = "arrange")
public class ArrangeController extends BaseControllerImpl<Arrange, Integer> implements BaseController<Arrange, Integer> {
    @Resource
    ArrangeService arrangeService;
    @Resource
    UserArrangeService userArrangeService;
    @Resource
    CourseService courseService;

    @Override
    public <D extends BaseService<Arrange, Integer>> D getService() {
        return (D) arrangeService;
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody Arrange entity) {
        return Result.getResult(() -> {
            Integer id = getService().create(entity);
            entity.setId(id);
            List<String> users = Arrays.asList(entity.getUserIds().split(","));
            List<String> courseUsers;
            courseUsers = Stream.of(entity.getCourseIds().split(",")).filter(s -> {
                try {
                    Integer.parseInt(s);
                    return true;
                } catch (Exception e) {
                    return false;
                }
            }).flatMap(s -> {
                Course course = courseService.getById(Integer.parseInt(s));
                return course.getStudents().stream().map(User::getId);


            }).distinct().collect(Collectors.toList());
            users.addAll(courseUsers);
            userArrangeService.creates(users.stream().distinct().map(s -> {
                UserArrange userArrange = new UserArrange();
                userArrange.setArrange(new Arrange(id));
                userArrange.setStatus(0);
                userArrange.setUser(new User(s));
                userArrange.setTeach(entity.getTeach());
                return userArrange;
            }).collect(Collectors.toList()));
            return id;
        });
    }
}
