package com.gss.datavisualization.util;

import com.gss.datavisualization.entity.Result;

/**
 * @create 2018-03-18 20:34
 * @desc
 **/
public class ResultUtil {
    public static Result resultReturner(int code, String msg, Object data){
        Result result = new Result();
        result.setErrCode(code);
        result.setMsg(msg);
        result.setData(data);
        return result;
    }

    public static Result resultGoodReturner(Object data){
        Result result = new Result();
        result.setErrCode(0);
        result.setMsg("ok");
        result.setData(data);
        return result;
    }

    public static Result resultGoodReturner( ){
        Result result = new Result();
        result.setErrCode(0);
        result.setMsg("ok");
        result.setData(null);
        return result;
    }

    public static Result resultBadReturner(String msg){
        Result result = new Result();
        result.setErrCode(1);
        result.setMsg(msg);
        result.setData(null);
        return result;
    }

    public static Result resultBadReturner(Object data){
        Result result = new Result();
        result.setErrCode(1);
        result.setMsg("error");
        result.setData(data);
        return result;
    }

    public static Result resultBadReturner(String msg,Object data){
        Result result = new Result();
        result.setErrCode(1);
        result.setMsg(msg);
        result.setData(data);
        return result;
    }
}

