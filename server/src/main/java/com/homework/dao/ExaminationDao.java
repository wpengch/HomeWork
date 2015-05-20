package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.Examination;
import org.springframework.stereotype.Repository;

/**
 * Created by luqiao on 15/5/20.
 */
@Repository
public class ExaminationDao extends BaseDaoImpl<Examination, Integer> implements BaseDao<Examination, Integer> {
}
