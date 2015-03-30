package com.homework.core.dao;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  2015-3-27-0027.
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
    public List<T> getList(HashMap<String, Object> condition) {
        Session session = sessionFactory.openSession();
        Criteria cri = session.createCriteria(entityClass);
        for (Map.Entry<String, Object> entry : condition.entrySet()) {
            if (entry.getValue() != null) {
                cri.add(Restrictions.eq(entry.getKey(), entry.getValue()));
            }
        }
        return cri.list();
    }

    @Override
    public List<T> getList(T entity) {
        Class<?> t = entity.getClass();
        Field[] fields = t.getDeclaredFields();
        HashMap<String, Object> map = new HashMap<>();
        for (Field field : fields) {
            field.setAccessible(true);
            String name = field.getName();
            Object value = null;
            try {
                value = field.get(entity);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
            if (value != null) {
                map.put(name, value);
            }
        }
        return getList(map);
    }

    @Override
    public T uniqueResult(HashMap<String, Object> conditions) {
        Session session = sessionFactory.openSession();
        Criteria cri = session.createCriteria(entityClass);
        for (Map.Entry<String, Object> entry : conditions.entrySet()) {
            if (entry.getValue() != null) {
                cri.add(Restrictions.eq(entry.getKey(), entry.getValue()));
            }
        }
        return (T) cri.uniqueResult();
    }

    @Override
    public T uniqueResult(T entity) {
        Class<?> t = entity.getClass();
        Field[] fields = t.getDeclaredFields();
        HashMap<String, Object> map = new HashMap<>();
        for (Field field : fields) {
            field.setAccessible(true);
            String name = field.getName();
            Object value = null;
            try {
                value = field.get(entity);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
            if (value != null) {
                map.put(name, value);
            }
        }
        return uniqueResult(map);
    }

    @Override
    public T firstResult(HashMap<String, Object> conditions) {
        List<T> results = getList(conditions);
        if (results == null || results.size() == 0) {
            return null;
        }
        return results.get(0);
    }

    @Override
    public T firstResult(T entity) {
        List<T> results = getList(entity);
        if (results == null || results.size() == 0) {
            return null;
        }
        return results.get(0);
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

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
