package com.homework.dao;

import com.homework.core.dao.BaseDao;
import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.Title;
import com.homework.entity.TitleAdd;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

/**
 * Created by 田黄雪薇 on 15/4/26.
 */
@Repository

public class TitleDao extends BaseDaoImpl<Title, Integer> implements BaseDao<Title, Integer> {
    public Title createTitle(TitleAdd titleAdd) {
        Session session = getSession();
        return new Title();
    }
}
