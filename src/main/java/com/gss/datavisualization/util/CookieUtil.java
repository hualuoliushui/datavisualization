package com.gss.datavisualization.util;

import com.alibaba.druid.sql.ast.statement.SQLAlterTableRename;
import com.google.gson.Gson;
import org.springframework.boot.autoconfigure.security.SecurityPrerequisite;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 * @create 2018-04-27 10:06
 * @desc
 **/
public class CookieUtil {
    public static void addCookie(HttpServletResponse response,
                                 String name,
                                 Object value){
        String valueStr = null;
        try {
            valueStr = URLEncoder.encode(new Gson().toJson(value),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Cookie cookie = new Cookie(name,valueStr);
        cookie.setPath("/");
        cookie.setMaxAge(Integer.MAX_VALUE);
        response.addCookie(cookie);
    }

    public static String getCookie(HttpServletRequest request,
                                   String name) {
        Cookie[] cookies= request.getCookies();
        if(cookies!=null){
            for (Cookie cookie : cookies) {
                if((name).equalsIgnoreCase(cookie.getName())){
                    try {
                        return URLDecoder.decode(cookie.getValue(),"UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                        return null;
                    }
                }
            }
        }
        return null;
    }

    public static <T> T getCookie(HttpServletRequest request,
                                  String name,
                                  Class<T> clazz){
        String jsonStr = getCookie(request,name);
        return new Gson().fromJson(jsonStr,clazz);
    }

    public static void removeCookie(HttpServletResponse response,
                                    String name){
        Cookie cookie = new Cookie(name,"");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
