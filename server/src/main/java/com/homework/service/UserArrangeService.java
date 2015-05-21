package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.UserArrangeDao;
import com.homework.entity.UserArrange;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/21.
 */
@Service
@Transactional
public class UserArrangeService extends BaseServiceImpl<UserArrange,Integer> implements BaseService<UserArrange,Integer> {
    @Resource
    UserArrangeDao userArrangeDao;
    @Override
    public <D extends BaseDao<UserArrange, Integer>> D getDao() {
        return (D) userArrangeDao;
    }
}
