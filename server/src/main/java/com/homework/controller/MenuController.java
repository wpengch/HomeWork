package com.homework.controller;

import com.homework.core.Result;
import com.homework.entity.User;
import com.homework.service.MenuService;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 由 田黄雪薇 创建于 2015-3-30-0030.
 */
@RestController
@RequestMapping(value="menu")
public class MenuController {
    @Autowired
    MenuService menuService;
    @Resource
    UserService userService;

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET)
    public Result menuTree(@RequestParam(value = "user")String userId) {
        User user = userService.getById(userId);
        return Result.getResult(() -> {
            return menuService.menuTree(user);
        });
    }
}
