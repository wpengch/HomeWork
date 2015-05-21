package com.homework.interceptor;

import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 过滤器,用于过滤跨域预检options.返回false
 * @author anfu.yang
 * @date 2015年3月24日 下午7:31:19
 */
public class AcrossDomainFilter extends HttpServlet implements Filter{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void doFilter(ServletRequest httpRequest, ServletResponse httpResponse,
			FilterChain chain) throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse)httpResponse;
		HttpServletRequest request = (HttpServletRequest)httpRequest;
		String s = request.getRemoteAddr();
		String method = request.getMethod();
		response.setHeader("Access-Control-Allow-Origin","http://"+s);
		response.setHeader("Access-Control-Allow-Methods","GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
		response.setHeader("Access-Control-Allow-Credentials","true");
		response.setHeader("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept");
//		response.setHeader("Access-Control-Allow-Headers","*");
		response.setHeader("Access-Control-Max-Age", "86400");
//		//预检的时候,返回false
		if(! method.equals("OPTIONS")){
			chain.doFilter(httpRequest, httpResponse);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
