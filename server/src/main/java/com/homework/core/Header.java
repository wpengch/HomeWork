package com.homework.core;

import com.homework.common.constant.BaseException;

/**
 *  2015-3-27-0027.
 */
public class Header {
    private int rc;
    private String rm;

    public Header() {
        rc = 0;
        rm = "成功";
    }

    public Header(BaseException e) {
        rc = e.getRc();
        rm = e.getRm();
    }

    public Header(int rc, String rm) {
        this.rc = rc;
        this.rm = rm;
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
}
