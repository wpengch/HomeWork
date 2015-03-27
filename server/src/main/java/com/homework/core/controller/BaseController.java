package com.homework.core.controller;

import com.homework.core.Result;

import java.util.List;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
public interface BaseController<T,ID> {
    Result create(T entity);
    Result delete(T entity);
    Result update(T entity);
    Result getAll();
    Result getById(ID id);
}
