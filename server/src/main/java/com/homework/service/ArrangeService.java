package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.ArrangeDao;
import com.homework.entity.Arrange;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/20.
 */
@Service
@Transactional
public class ArrangeService extends BaseServiceImpl<Arrange, Integer> implements BaseService<Arrange,  Integer> {
    @Resource
    ArrangeDao arrangeDao;
    @Override
    public <D extends BaseDao<Arrange, Integer>> D getDao() {
        return (D) arrangeDao;
    }
}
