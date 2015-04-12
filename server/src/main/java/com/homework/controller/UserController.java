package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.User;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
@RestController
@RequestMapping("user")
public class UserController extends BaseControllerImpl<User,String> {
    @Autowired
    UserService userService;

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

}
