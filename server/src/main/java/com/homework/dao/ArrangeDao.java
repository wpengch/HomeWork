package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.Arrange;
import org.springframework.stereotype.Repository;

/**
 * Created by luqiao on 15/5/20.
 */
@Repository
public class ArrangeDao extends BaseDaoImpl<Arrange,Integer> implements BaseDao<Arrange, Integer> {
}
