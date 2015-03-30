package com.homework.common.constant;

/**
 * 本地变量类<p>用于存储一些常用的本地变量.</p>
 * @author anfu.yang
 * @date 2015年3月9日 上午9:29:07
 */
public interface LocalConstant {
	/**activiti modeler url 后缀*/
	public static final String ACTIVITI_MODELER_SUFFIX = "activiti_modeler_suffix";
	/**
	 * redis token过期时间
	 * 24*60*60*1000
	 * 86400
	 */
	public static final long DEFAULT_TOKEN_EXPIRED = 86400000l;
	/**
	 * 用户最大保存的时间,即cookie最大时间
	 */
	public static final long MAX_TOKEN_EXPIRED = 7*86400000l;
	/**
	 * header 认证token参数
	 */
	public static final String AUTH_HEADER_TOKEN="auth_token";
	/**
	 * 添加用户时的默认密码
	 */
	public static final String USER_DEFAUT_PASSWORD="user_defaut_password";
	/**
	 * 加密的key
	 */
	public static final String ENCRPT_KEY = "79616E67616E66756E6D2E";
	
	 /**
     * 企业新闻推送
     */
    public static final String COMPANY_NEWS = "Company_News";
    /**
     * 企业新闻评论推送
     */
    public static final String COMPANY_NEWSREVIEW = "Company_NewsReview";
    /**
     * 企业通告推送
     */
    public static final String COMPANY_NOTICE = "Company_Notice";
    /**
     * openfire_resource
     */
    public static final String OPENFIRE_RESOURCE = "openfire_resource";
    
    /**
     * reids OA userinfo key
     */
    public static final String OA_USERINFO_LIST="OA#userinfo_list";
    
    public static final String OA_USERINFO_PREFIX="OA#userinfo@";
    /**
     * redis OA department List key
     */
    public static final String OA_DEPARTMENT_LIST="OA#department_list";
    /**
     * redis OA single department key
     */
    public static final String OA_DEPARTMENT_PREFIX="OA#department@";

    /**
     * redis OA post List key
     */
    public static final String OA_POST_LIST="OA#post_list";
    /**
     * redis OA posttype List key
     */
    public static final String OA_POSTTYPE_LIST="OA#posttype_list";
    /**
     * redis OA postlevel List key
     */
    public static final String OA_POSTLEVEL_LIST="OA#postlevel_list";
    /**
     * redis OA single post key
     */
    public static final String OA_POST_PREFIX="OA#post@";

    /**
     * redis OA deppost List key
     */
    public static final String OA_DEPPOST_LIST="OA#deppost_list";

    /**
     * redis OA deppostuser List key
     */
    public static final String OA_DEPPOSTUSER_LIST="OA#deppostuser_list";

}
