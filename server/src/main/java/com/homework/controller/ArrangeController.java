package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Arrange;
import com.homework.service.ArrangeService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/20.
 */
@RestController
@RequestMapping(value = "arrange")
public class ArrangeController extends BaseControllerImpl<Arrange, Integer> implements BaseController<Arrange, Integer> {
    @Resource
    ArrangeService arrangeService;
    @Override
    public <D extends BaseService<Arrange, Integer>> D getService() {
        return (D) arrangeService;
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody Arrange entity) {
        return super.create(entity);
    }
}
