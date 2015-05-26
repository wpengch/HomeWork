package com.homework.core;

import com.homework.common.constant.BaseException;

import java.util.HashMap;

/**
 * 由 田黄雪薇 创建于 2015-3-27-0027.
 */
public class Result {
    private Header header;
    private Object data;

    public Result() {
        header = new Header();
    }

    public static Result getResult(IResult result) {
        Result r = new Result();
        try {
            r.data = result.query();
        } catch (Exception ex) {
            if (ex instanceof BaseException) {
                r.header = new Header((BaseException) ex);
            } else {
                r.header = new Header(1, "失败" + ex.getMessage());
            }
        }
        return r;
    }

    public static Result getResult(String key, Object value) {
        Result r = new Result();
        HashMap<String, Object> map = new HashMap<>();
        map.put(key, value);
        r.setData(map);
        return r;
    }

    public static Result getResult(HashMap<String, Object> map) {
        Result r = new Result();
        r.setData(map);
        return r;
    }

    public static Result getResult(int rc, String rm) {
        Result result = new Result();
        result.getHeader().setRc(rc);
        result.getHeader().setRm(rm);
        return result;
    }

    public static Result getResult(IResult result, int rc, String rm) {
        Result r = new Result();
        try {
            r.data = result.query();
        } catch (Exception ex) {
            r.header = new Header(rc, rm);
        }
        return r;
    }

    /**
     * Getter for property 'header'.
     *
     * @return Value for property 'header'.
     */
    public Header getHeader() {
        return header;
    }

    /**
     * Setter for property 'header'.
     *
     * @param header Value to set for property 'header'.
     */
    public void setHeader(Header header) {
        this.header = header;
    }

    /**
     * Getter for property 'data'.
     *
     * @return Value for property 'data'.
     */
    public Object getData() {
        return data;
    }

    /**
     * Setter for property 'data'.
     *
     * @param data Value to set for property 'data'.
     */
    public void setData(Object data) {
        this.data = data;
    }
}
