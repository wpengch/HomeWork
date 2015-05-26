package com.homework.controller;

import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Respondent;
import com.homework.service.RespondentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/21.
 */
@RestController
@RequestMapping("respondent")
public class RespondentController extends BaseControllerImpl<Respondent,Integer> implements BaseController<Respondent,Integer>{
    @Resource
    RespondentService respondentService;
    @Override
    public <D extends BaseService<Respondent, Integer>> D getService() {
        return (D) respondentService;
    }
}
