package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.Answer;
import org.springframework.stereotype.Repository;

/**
 * Created by 田黄雪薇 on 15/5/16.
 */
@Repository
public class AnswerDao extends BaseDaoImpl<Answer, Integer> implements BaseDao<Answer, Integer>{
}
