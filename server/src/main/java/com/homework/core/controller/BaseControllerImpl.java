package com.homework.core.controller;

import com.homework.core.Result;
import com.homework.core.service.BaseService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

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
    public Result getAll(HttpServletRequest request, HttpServletResponse response) {
        return Result.getResult(() -> {
            HashMap<String, Object> objectHashMap = new HashMap<>();
            request.getParameterMap().entrySet().forEach(o -> {
                Map.Entry entry  = (Map.Entry) o;
                objectHashMap.put(entry.getKey().toString(), ((String[])entry.getValue())[0]);
            });
            return getService().getList(objectHashMap);
        });
    }

    @Override
    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Result getById(@PathVariable("id") ID id) {
        return Result.getResult(() -> getService().getById(id));
    }

    public abstract <D extends BaseService<T, ID>> D getService();


    public Map<String, String> getParams(HttpServletRequest request) {
        Map<String, String> results = new HashMap<>();
        for (Object entry : request.getParameterMap().entrySet()) {
            Map.Entry<String, String[]> item = (Map.Entry<String, String[]>) entry;
            results.put(item.getKey(), item.getValue()[0]);
        }
        return results;
    }
}
