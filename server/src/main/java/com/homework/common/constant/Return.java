package com.homework.common.constant;

/**
 * 由 田黄雪薇 创建于 2015-3-30-0030.
 */
public class Return {
    public static class Code{
        public static final int Success = 0;
        public static final int AUTH_FAIL = 1;
        public static final int UserOrPasswordFail = 2;
    }

    public static class Message{
        public static final String Success = "操作成功";
        public static final String AUTH_FAIL = "认证失败";
        public static final String UserOrPasswordFail = "用户名或者密码不对";

    }
}
