package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.AnswerDao;
import com.homework.entity.Answer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by 田黄雪薇 on 15/5/16.
 */
@Service
public class AnswerService extends BaseServiceImpl<Answer,Integer> implements BaseService<Answer,Integer> {
    @Resource
    AnswerDao answerDao;
    @Override
    public <D extends BaseDao<Answer, Integer>> D getDao() {
        return (D) answerDao;
    }
}
