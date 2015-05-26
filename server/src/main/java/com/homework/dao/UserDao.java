package com.homework.dao;

import com.homework.core.dao.BaseDaoImpl;
import com.homework.entity.User;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

/**
 *  2015-3-27-0027.
 */
@Repository
public class UserDao extends BaseDaoImpl<User, String> {
    public User getUserByTokenAndIP(String token,String ip) {
        Query query = getSessionFactory().openSession().createQuery("select u from User u where token=? and ip=?");
        query.setParameter(0, token);
        query.setParameter(1, ip);
        return (User) query.uniqueResult();
    }
}
