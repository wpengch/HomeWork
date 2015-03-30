package com.homework.controller;

import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.User;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
