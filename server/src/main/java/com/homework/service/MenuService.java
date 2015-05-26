package com.homework.service;

import com.homework.common.utils.CollectionUtil;
import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.MenuDao;
import com.homework.entity.Menu;
import com.homework.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
@Service
@Transactional
public class MenuService extends BaseServiceImpl<Menu, String> {
    public static HashMap<String, Menu> tokenMap = new HashMap<>();
    @Autowired
    MenuDao menuDao;

    @Override
    public <D extends BaseDao<Menu, String>> D getDao() {
        return (D) menuDao;
    }

    public List<Menu> menuTree(User user) {
        List<Menu> menus = menuDao.getAll();
        menus = menus.stream().filter(menu -> menu.getPower() == 0 || menu.getPower() == user.getType() + 1).collect(Collectors.toList());

        return CollectionUtil.generateTree(menus, new CollectionUtil.TreeHelper<Menu, Object>() {
            @Override
            public Object getId(Menu value) {
                return value.getId();
            }

            @Override
            public Object getPid(Menu value) {
                return value.getPid();
            }

            @Override
            public Object getRootId() {
                return 0;
            }

            @Override
            public List<Menu> getChildren(Menu value) {
                return value.getChildren();
            }
        });
    }
}
