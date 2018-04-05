package com.gss.datavisualization.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @create 2018-03-18 21:41
 * @desc
 **/
public class DateUtil {
    protected static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static String now(){
        return format.format(new Date());
    }
}
