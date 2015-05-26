package com.homework.common.constant;

/**
 * 由 田黄雪薇 创建于 2015-3-30-0030.
 */
public class BaseException extends RuntimeException {
    private int rc;
    private String rm;

    public BaseException() {
    }

    public BaseException(int rc, String rm) {
        super(rm);
        this.rc = rc;
        this.rm = rm;
    }

    /**
     * Getter for property 'rc'.
     *
     * @return Value for property 'rc'.
     */
    public int getRc() {
        return rc;
    }

    /**
     * Setter for property 'rc'.
     *
     * @param rc Value to set for property 'rc'.
     */
    public void setRc(int rc) {
        this.rc = rc;
    }

    /**
     * Getter for property 'rm'.
     *
     * @return Value for property 'rm'.
     */
    public String getRm() {
        return rm;
    }

    /**
     * Setter for property 'rm'.
     *
     * @param rm Value to set for property 'rm'.
     */
    public void setRm(String rm) {
        this.rm = rm;
    }
}
