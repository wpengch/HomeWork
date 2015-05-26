package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Answer;
import com.homework.service.AnswerService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * Created by 田黄雪薇 on 15/5/16.
 */
@RestController
@RequestMapping("answer")
public class AnswerController extends BaseControllerImpl<Answer,Integer> implements BaseController<Answer,Integer> {
    @Resource
    AnswerService answerService;
    @Override
    public <D extends BaseService<Answer, Integer>> D getService() {
        return (D) answerService;
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody Answer entity) {
        return super.create(entity);
    }
}
