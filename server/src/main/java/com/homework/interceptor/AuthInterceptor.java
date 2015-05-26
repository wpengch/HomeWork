package com.homework.interceptor;

import com.homework.common.constant.LocalConstant;
import com.homework.common.constant.Return;
import com.homework.entity.User;
import com.homework.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 认证拦截器,用于拦截没有登录的用户.
 * 
 * @author anfu.yang
 * @date 2015年3月10日 下午8:17:17
 */
public class AuthInterceptor implements HandlerInterceptor {
	@Resource
	UserService userService;

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		request.setCharacterEncoding("utf-8");
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for(Cookie cookie : cookies ){
				String name = cookie.getName();
				if(LocalConstant.AUTH_HEADER_TOKEN.equals(name)){
					String token = cookie.getValue();
					String ip = userService.getIPAddress(request);
					User user = null;
					try {
						user = userService.getUserByTokenAndIP(token, ip);
					} catch (Exception e) {
						e.printStackTrace();
					}
					if (user != null) {
						return true;
					}
				}
			}
		}
		redirect(Return.Code.AUTH_FAIL, Return.Message.AUTH_FAIL, request, response);
		return false;
	}

	private void redirect(int rc,String rm,
			HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException{
		request.getRequestDispatcher("/default/error?rc=" + rc+ "&&rm=" + rm).forward(request, response);
	}
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

}
