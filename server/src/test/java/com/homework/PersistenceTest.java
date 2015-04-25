package com.homework;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.Test;

import java.util.List;

/**
 * 由 田黄雪薇 创建于 15/4/18.
 */
public class PersistenceTest {
    SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    @Test
    public void readMessage() {
        Session session = sessionFactory.openSession();

        List users = session.createQuery("from User").list();
    }
}
