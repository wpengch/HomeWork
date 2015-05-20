package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.BigTitle;
import org.springframework.stereotype.Repository;

/**
 * Created by luqiao on 15/5/20.
 */
@Repository
public class BigTitleDao extends BaseDaoImpl<BigTitle, Integer> implements BaseDao<BigTitle, Integer> {
}
