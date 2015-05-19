package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Department;
import com.homework.entity.User;
import com.homework.service.DepartmentService;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 *  2015-3-27-0027.
 */
@RestController
@RequestMapping("department")
public class DepartmentController extends BaseControllerImpl<Department,Integer> {
    @Autowired
    DepartmentService departmentService;
    @Autowired
    UserService userService;

    @Override
    public <D extends BaseService<Department, Integer>> D getService() {
        return (D) departmentService;
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody Department entity) {
        return super.create(entity);
    }

    @RequestMapping(value = "/{depId}/user")
    public Result getUsersByDepId(@PathVariable("depId") int depId) {
        return Result.getResult(() -> {
            List<Department> departments = departmentService.departmentTree();
            List<Department> results = new ArrayList<>(departments);
            Department department = null;
            while (results.size() > 0) {
                Department item = results.remove(0);
                if (item.getId() == depId) {
                    department = item;
                    break;
                }
            }
            if (department == null) {
                return new ArrayList<User>();
            }
            results.clear();
            results.add(department);
            Map<Integer, Department> departmentMap = new HashMap<>();
            while (results.size() > 0) {
                Department item = results.remove(0);
                departmentMap.put(item.getId(), item);
                results.addAll(item.getChildren());
            }
            List<User> all = userService.getAll();

            return all.stream().filter(user -> departmentMap.containsKey(user.getDepId())).collect(Collectors.toList());
        });
    }

    @RequestMapping(value = "/{depId}/user", method = RequestMethod.POST)
    public Result addUsers(@PathVariable("depId") Integer depId, @RequestBody List<String> ids) {
        return Result.getResult(() -> {
            for (String id : ids) {
                User user = userService.getById(id);
                if (user == null) {
                    continue;
                }
                user.setDepId(depId);
                userService.update(user);
            }
            return ids.size();
        });
    }

}
