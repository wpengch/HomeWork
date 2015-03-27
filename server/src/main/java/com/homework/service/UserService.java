package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.UserDao;
import com.homework.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
@Service
@Transactional
public class UserService extends BaseServiceImpl<User,String> {
    @Autowired
    UserDao userDao;

    @Override
    public <D extends BaseDao<User, String>> D getDao() {
        return (D) userDao;
    }
}
