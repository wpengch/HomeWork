package com.homework.controller;

import com.google.common.base.Strings;
import com.homework.common.constant.BaseException;
import com.homework.common.constant.LocalConstant;
import com.homework.common.constant.Return;
import com.homework.core.Result;
import com.homework.entity.User;
import com.homework.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("auth")
public class AuthenticationController {
    @Resource
    UserService userService;

    /**
     * 用户登陆,存入cookie,返回token
     *
     * @param response
     * @param request
     * @param username
     * @param password
     * @param savePasswd
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping("login")
    public Result login(HttpServletResponse response, HttpServletRequest request,
                        @RequestParam("username") String username,
                        @RequestParam("password") String password, boolean savePasswd)
            throws IOException {

        Result result = Result.getResult(() -> {
            if (Strings.isNullOrEmpty(username) || Strings.isNullOrEmpty(password)) {
                throw new BaseException(Return.Code.UserOrPasswordFail, Return.Message.UserOrPasswordFail);
            }
            User condition = new User();
            condition.setId(username);
            condition.setPassword(password);
            User user = userService.uniqueResult(condition);
            if (user == null) {
                throw new BaseException(Return.Code.UserOrPasswordFail, Return.Message.UserOrPasswordFail);
            }
            String ip = userService.getIPAddress(request);
            String token = userService.createToken(user, ip, savePasswd);
            user.setIp(ip);
            user.setToken(token);
            userService.update(user);
            addCookie(token, response, savePasswd);
            HashMap<String, String> map = new HashMap<>();
            map.put("token", token);
            return map;
        });

        return result;
    }

    /**
     * 认证接口,校验用户是否合法.
     *
     * @param response
     * @param request
     * @param map
     * @throws IOException
     */
    @RequestMapping("auth")
    public Result auth(HttpServletResponse response, HttpServletRequest request,
                       @RequestBody Map<String, Object> map) throws IOException {
        return Result.getResult(() -> {
            String token = (String) map.get("token");
            HashMap<String, String> map1 = new HashMap<>();
            if (StringUtils.isEmpty(token)) {
                throw new RuntimeException();
            }
            String ip = userService.getIPAddress(request);
            User user = userService.getUserByTokenAndIP(token, ip);
            if (user == null) {
                throw new BaseException(Return.Code.AUTH_FAIL, Return.Message.AUTH_FAIL);
            } else {
                map1.put("username", user.getId());
                addCookie(token, response, false);
            }
            return map1;
        });
    }


    private void addCookie(String token, HttpServletResponse response, boolean savePasswd) {
        Cookie cookie = new Cookie(LocalConstant.AUTH_HEADER_TOKEN, token);
        if (savePasswd) {
            cookie.setMaxAge((int) LocalConstant.MAX_TOKEN_EXPIRED);
        }
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}



