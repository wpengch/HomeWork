package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.BigTitle;
import com.homework.service.BigTitleService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/20.
 */
@RestController
@RequestMapping("/bigtitle")
public class BigTitleController extends BaseControllerImpl<BigTitle, Integer> implements BaseController<BigTitle, Integer> {
    @Resource
    BigTitleService bigTitleService;
    @Override
    public <D extends BaseService<BigTitle, Integer>> D getService() {
        return (D) bigTitleService;
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody BigTitle entity) {
        return super.create(entity);
    }
}
