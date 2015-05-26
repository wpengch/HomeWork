package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.BigTitleDao;
import com.homework.entity.BigTitle;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/20.
 */
@Service
@Transactional
public class BigTitleService extends BaseServiceImpl<BigTitle, Integer> implements BaseService<BigTitle, Integer> {
    @Resource
    BigTitleDao bigTitleDao;
    @Override
    public <D extends BaseDao<BigTitle, Integer>> D getDao() {
        return (D) bigTitleDao;
    }
}
