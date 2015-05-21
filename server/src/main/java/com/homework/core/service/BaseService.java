package com.homework.core.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

/**
 *  2015-3-27-0027.
 */
public interface BaseService<T, ID> {
    ID create(T entity);

    void creates(T... entities);
    void creates(Collection<T> entities);

    boolean delete(T entity);

    boolean update(T entity);

    List<T> getList(HashMap<String, Object> condition);

    List<T> getList(T entity);

    T uniqueResult(HashMap<String, Object> conditions);

    T uniqueResult(T entity);

    T firstResult(HashMap<String, Object> conditions);

    T firstResult(T entity);

    List<T> getAll();

    T getById(ID id);

    boolean deleteById(ID id);
}
