package com.homework.service;

import com.homework.common.constant.LocalConstant;
import com.homework.common.utils.CollectionUtil;
import com.homework.common.utils.DateUtil;
import com.homework.common.utils.encrypt.AES;
import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.MenuDao;
import com.homework.dao.UserDao;
import com.homework.entity.Menu;
import com.homework.entity.User;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
@Service
@Transactional
public class MenuService extends BaseServiceImpl<Menu,String> {
    @Autowired
    MenuDao menuDao;

    public static HashMap<String, Menu> tokenMap = new HashMap<>();

    @Override
    public <D extends BaseDao<Menu, String>> D getDao() {
        return (D) menuDao;
    }

    public List<Menu> menuTree() {
        List<Menu> menus = menuDao.getAll();

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
