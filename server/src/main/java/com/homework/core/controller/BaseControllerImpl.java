package com.homework.core.controller;

import com.homework.core.Result;
import com.homework.core.service.BaseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
public abstract class BaseControllerImpl<T, ID> implements BaseController<T, ID> {
    @Override
    @ResponseBody
//    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody T entity) {
        return Result.getResult(() -> getService().create(entity));
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE)
    public Result delete(@RequestBody T entity) {
        return Result.getResult(() -> getService().delete(entity));
    }

    @ResponseBody
    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Result deleteById(@PathVariable("id")ID id) {
        return Result.getResult(() -> {
            return getService().deleteById(id);
        });
    }

    @Override
    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Result update(@RequestBody T entity) {
        return Result.getResult(() -> getService().update(entity));
    }

    @Override
    @ResponseBody
    @RequestMapping(method = RequestMethod.GET)
    public Result getAll() {
        return Result.getResult(() -> getService().getAll());
    }

    @Override
    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Result getById(@PathVariable("id") ID id) {
        return Result.getResult(() -> getService().getById(id));
    }

    public abstract <D extends BaseService<T, ID>> D getService();
}
