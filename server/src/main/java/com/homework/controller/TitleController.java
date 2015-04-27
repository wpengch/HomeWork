package com.homework.controller;

import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Title;
import com.homework.service.TitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 田黄雪薇 on 15/4/26.
 */
@RestController
@RequestMapping("title")
public class TitleController extends BaseControllerImpl<Title, Integer> implements BaseController<Title, Integer> {
    @Autowired
    TitleService titleService;

    @Override
    public <D extends BaseService<Title, Integer>> D getService() {
        return (D) titleService;
    }
}
