package com.homework.controller;

import com.homework.core.Result;
import com.homework.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 由 田黄雪薇 创建于 2015-3-30-0030.
 */
@RestController
@RequestMapping(value="menu")
public class MenuController {
    @Autowired
    MenuService menuService;

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET)
    public Result menuTree() {
        return Result.getResult(menuService::menuTree);
    }
}
