package com.homework.service;

import com.homework.common.constant.LocalConstant;
import com.homework.common.utils.DateUtil;
import com.homework.common.utils.encrypt.AES;
import com.homework.core.dao.BaseDao;
import com.homework.core.service.BaseServiceImpl;
import com.homework.dao.UserDao;
import com.homework.entity.User;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
@Service
@Transactional
public class UserService extends BaseServiceImpl<User,String> {
    @Autowired
    UserDao userDao;

    public static HashMap<String, User> tokenMap = new HashMap<>();

    @Override
    public <D extends BaseDao<User, String>> D getDao() {
        return (D) userDao;
    }

    public String getIPAddress(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    public String createToken(User user,String IPAddress,boolean savePasswd) throws Exception {
        Map<String,Object> map = new HashMap<>();
        map.put("login_ip", IPAddress);
        map.put("login_name", user.getId());
        map.put("login_time", DateUtil.getCurrentTime().getTime());
        Long token_expired = LocalConstant.DEFAULT_TOKEN_EXPIRED;
        if(savePasswd){
            token_expired = LocalConstant.MAX_TOKEN_EXPIRED;
        }
        map.put("expired", token_expired);
        String token = encrpt(map);
        return token;
    }

    private String encrpt(Map<String,Object> map) throws Exception{
        JSONObject encrptJson = JSONObject.fromObject(map);
        return AES.encrypt(encrptJson.toString(), LocalConstant.ENCRPT_KEY);
    }

    public User getUserByTokenAndIP(String token,String ip) {
        return userDao.getUserByTokenAndIP(token,ip);
    }
}
