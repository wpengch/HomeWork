package com.homework;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import java.util.Map;

/**
 * Created by 田黄雪薇 on 15/4/18.
 */
public class HibernateUtil {
    private static SessionFactory sessionFactory = buildSessionFactory();
    private static ServiceRegistry serviceRegistry;

    private static SessionFactory buildSessionFactory(){
        Configuration configuration = new Configuration();
        configuration.configure();
        StandardServiceRegistryBuilder standardServiceRegistryBuilder = new StandardServiceRegistryBuilder();
        for (Map.Entry entry : configuration.getProperties().entrySet()) {
            standardServiceRegistryBuilder.applySetting(entry.getKey().toString(), entry.getValue());
        }
        serviceRegistry = standardServiceRegistryBuilder.build();
        sessionFactory = configuration.buildSessionFactory(serviceRegistry);
        return sessionFactory;
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        getSessionFactory().close();
    }
}
