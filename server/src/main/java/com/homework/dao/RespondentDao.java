package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.Respondent;
import org.springframework.stereotype.Repository;

/**
 * Created by luqiao on 15/5/21.
 */
@Repository
public class RespondentDao extends BaseDaoImpl<Respondent, Integer> implements BaseDao<Respondent, Integer> {
}
