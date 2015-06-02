package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.TitleDao;
import com.homework.entity.Title;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 田黄雪薇 on 15/4/26.
 */
@Service
public class TitleService extends BaseServiceImpl<Title, Integer> implements BaseService<Title, Integer> {
    @Autowired
    TitleDao titleDao;
    @Override
    public <D extends BaseDao<Title, Integer>> D getDao() {
        return (D) titleDao;
    }
}
