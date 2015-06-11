package com.homework.core.dao;

import org.hibernate.*;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2015-3-27-0027.
 */
@Transactional
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

    public Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public ID create(T entity) {
        Session session = getSession();
        ID id = (ID) session.save(entity);
        session.flush();
        return id;
    }

    @Override
    public void creates(T... entities) {
        Session session = getSession();
        Transaction ts = session.beginTransaction();
        for (T entity : entities) {
            session.save(entity);
        }
        session.flush();
        ts.commit();
    }

    @Override
    public void creates(Collection<T> entities) {
        Session session = getSession();
        Transaction ts = session.beginTransaction();
        entities.forEach(session::save);
        session.flush();
        ts.commit();
    }

    @Override
    public boolean delete(T entity) {
        Session session = getSession();
        session.delete(entity);
        session.flush();
        return true;
    }

    @Override
    public boolean update(T entity) {
        Session session = getSession();
        Object obj = session.merge(entity);
        session.update(obj);
        session.flush();
        return true;
    }

    @Override
    public List<T> getList(HashMap<String, Object> condition) {
        Session session = getSession();
        Criteria cri = session.createCriteria(entityClass);
        for (Map.Entry<String, Object> entry : condition.entrySet()) {
            if (entry.getValue() != null) {
                try {
                    Field field = entityClass.getDeclaredField(entry.getKey());
                    Object value = null;
                    String tmp = entry.getValue() instanceof String ? (String)entry.getValue() : entry.getValue().toString();
                    if (field.getType() == Integer.class) {
                        value = Integer.parseInt(tmp);
                    } else if (field.getType() == Double.class) {
                        value = Double.parseDouble(tmp);
                    } else if (field.getType() == Boolean.class) {
                        value = Boolean.parseBoolean(tmp);
                    }else {
                        value = entry.getValue();
                    }
                    cri.add(Restrictions.eq(entry.getKey(), value));
                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                }

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
        Session session = getSession();
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
        Query query = getSession().createQuery("from " + entityClass.getSimpleName());
        return query.list();
    }

    @Override
    public T getById(ID id) {
        return (T) getSession().get(entityClass.getName(), (Serializable) id);
    }

    @Override
    public boolean deleteById(ID id) {
        Session session = getSession();
        String hql = String.format("delete from %s where id=?", entityClass.getName());
        Query query = session.createQuery(hql);
        query.setParameter(0, id);
        query.executeUpdate();
        session.flush();
        return true;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
