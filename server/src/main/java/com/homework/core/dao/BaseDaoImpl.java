package com.homework.core.dao;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
public abstract class BaseDaoImpl<T, ID> implements BaseDao<T, ID> {
    private Class<T> entityClass;
    private Class<ID> idClass;

    @Autowired
    SessionFactory sessionFactory;

    public BaseDaoImpl() {
        Type genType = getClass().getGenericSuperclass();
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
        entityClass = (Class<T>) params[0];
        idClass = (Class<ID>) params[1];
    }

    @Override
    public ID create(T entity) {
        return (ID) sessionFactory.openSession().save(entity);
    }

    @Override
    public boolean delete(T entity) {
        sessionFactory.openSession().delete(entity);
        return true;
    }

    @Override
    public boolean update(T entity) {
        sessionFactory.openSession().update(entity);
        return true;
    }

    @Override
    public List<T> getAll() {
        Query query = sessionFactory.openSession().createQuery("from " + entityClass.getSimpleName());
        return query.list();
    }

    @Override
    public T getById(ID id) {
        return (T) sessionFactory.openSession().get(entityClass.getName(), (Serializable) id);
    }
}
