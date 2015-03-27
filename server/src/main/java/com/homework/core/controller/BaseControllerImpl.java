package com.homework.core.controller;

import com.homework.core.Result;
import com.homework.core.service.BaseService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
public abstract class BaseControllerImpl<T, ID> implements BaseController<T, ID> {
    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(T entity) {
        return Result.getResult(() -> getService().create(entity));
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE)
    public Result delete(T entity) {
        return Result.getResult(()->getService().delete(entity));
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT)
    public Result update(T entity) {
        return Result.getResult(()->getService().update(entity));
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.GET)
    public Result getAll() {
        return Result.getResult(()->getService().getAll());
    }

    @Override
    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Result getById(@PathVariable("id") ID id) {
        return Result.getResult(() -> getService().getById(id));
    }

    public abstract <D extends BaseService<T, ID>> D getService();
}
