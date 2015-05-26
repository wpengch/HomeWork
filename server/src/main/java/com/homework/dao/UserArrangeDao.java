package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.UserArrange;
import org.springframework.stereotype.Repository;

/**
 * Created by luqiao on 15/5/21.
 */
@Repository
public class UserArrangeDao extends BaseDaoImpl<UserArrange,Integer> implements BaseDao<UserArrange,Integer> {
}
