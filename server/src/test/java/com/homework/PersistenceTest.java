package com.homework;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.testng.annotations.Test;

import java.util.List;

/**
 * Created by 田黄雪薇 on 15/4/18.
 */
public class PersistenceTest {
    SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    @Test
    public void readMessage() {
        Session session = sessionFactory.openSession();

        List users = session.createQuery("from User").list();
    }
}
