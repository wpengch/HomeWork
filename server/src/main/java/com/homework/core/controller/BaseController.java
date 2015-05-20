package com.homework.core.controller;

import com.homework.core.Result;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
public interface BaseController<T,ID> {
    Result create(T entity);
    Result delete(T entity);
    Result deleteById(ID id);
    Result update(T entity);
    Result getAll(HttpServletRequest request, HttpServletResponse response);
    Result getById(ID id);
}
