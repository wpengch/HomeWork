package com.homework.service;

import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseService;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.ExaminationDao;
import com.homework.entity.Examination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by luqiao on 15/5/20.
 */
@Service
@Transactional
public class ExaminationService extends BaseServiceImpl<Examination, Integer> implements BaseService<Examination, Integer> {
    @Resource
    ExaminationDao examinationDao;
    @Override
    public <D extends BaseDao<Examination, Integer>> D getDao() {
        return (D) examinationDao;
    }
}
