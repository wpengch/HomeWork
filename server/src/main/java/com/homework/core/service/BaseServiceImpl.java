package com.homework.core.service;


import com.homework.core.dao.BaseDao;

import java.util.HashMap;
import java.util.List;

/**
 *  2015-3-27-0027.
 */
public abstract class BaseServiceImpl<T,ID> implements BaseService<T, ID> {

    @Override
    public ID create(T entity) {
        return getDao().create(entity);
    }

    @Override
    public boolean delete(T entity) {
        return getDao().delete(entity);
    }

    @Override
    public boolean update(T entity) {
        return getDao().update(entity);
    }

    @Override
    public List<T> getList(HashMap<String, Object> condition) {
        return getDao().getList(condition);
    }

    @Override
    public List<T> getList(T entity) {
        return getDao().getList(entity);
    }
    @Override
    public T uniqueResult(HashMap<String, Object> conditions) {
        return getDao().uniqueResult(conditions);
    }
    @Override
    public T uniqueResult(T entity) {
        return getDao().uniqueResult(entity);
    }
    @Override
    public T firstResult(HashMap<String, Object> conditions) {
        return getDao().firstResult(conditions);
    }
    @Override
    public T firstResult(T entity) {
        return getDao().firstResult(entity);
    }

    @Override
    public List<T> getAll() {
        return getDao().getAll();
    }

    @Override
    public T getById(ID id) {
        return getDao().getById(id);
    }

    public abstract <D extends BaseDao<T,ID>> D getDao();
}
