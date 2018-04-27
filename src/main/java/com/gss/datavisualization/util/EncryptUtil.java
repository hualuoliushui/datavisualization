package com.gss.datavisualization.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @create 2018-04-27 0:00
 * @desc 加密工具封装
 **/
public class EncryptUtil {
    private static final String KEY_MD5 = "MD5";
    private static final String KEY_SHA = "SHA";

    private static String encrypt(String key,String inputStr){
        BigInteger bigInteger = null;
        try {
            MessageDigest md = MessageDigest.getInstance(KEY_MD5);
            byte[] inputData = inputStr.getBytes();
            md.update(inputData);
            bigInteger = new BigInteger(md.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return bigInteger.toString(16);
    }

    private static String md5(String str){
        return encrypt(KEY_MD5,str);
    }

    private static String sha(String str){
        return encrypt(KEY_SHA,str);
    }

    public static String encrypt(String str){
        return sha(md5(str));
    }
}
