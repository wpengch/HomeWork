package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.RespondentDao;
import com.homework.entity.Respondent;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/21.
 */
@Service
@Transactional
public class RespondentService extends BaseServiceImpl<Respondent, Integer> implements BaseService<Respondent, Integer> {
    @Resource
    RespondentDao respondentDao;
    @Override
    public <D extends BaseDao<Respondent, Integer>> D getDao() {
        return (D) respondentDao;
    }
}
