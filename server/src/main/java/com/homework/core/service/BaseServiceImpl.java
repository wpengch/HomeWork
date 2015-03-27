package com.homework.core.service;


import com.homework.core.dao.BaseDao;

import java.util.List;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
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
    public List<T> getAll() {
        return getDao().getAll();
    }

    @Override
    public T getById(ID id) {
        return getDao().getById(id);
    }

    public abstract <D extends BaseDao<T,ID>> D getDao();
}
