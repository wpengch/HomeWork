package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.BigTitle;
import com.homework.entity.Examination;
import com.homework.service.BigTitleService;
import com.homework.service.ExaminationService;
import com.homework.service.TitleService;
import com.homework.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by luqiao on 15/5/20.
 */
@RestController
@RequestMapping(value = "/exam")
public class ExaminationController extends BaseControllerImpl<Examination, Integer> implements BaseController<Examination,Integer> {
    @Resource
    ExaminationService examinationService;
    @Resource
    UserService userService;
    @Resource
    BigTitleService bigTitleService;
    @Resource
    TitleService titleService;
    @Override
    public <D extends BaseService<Examination, Integer>> D getService() {
        return (D) examinationService;
    }


    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody Examination entity) {
        return Result.getResult(() -> {
            List<BigTitle> titleList = entity.getTitles();
            entity.setTitles(null);
            Integer id = examinationService.create(entity);
            entity.setId(id);
            for (BigTitle title : titleList) {
                title.setExamination(entity);
                bigTitleService.create(title);
            }
            return id;
        });

    }
}
