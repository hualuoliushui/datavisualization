package com.gss.datavisualization.config;

import com.gss.datavisualization.util.ResultUtil;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @create 2018-03-18 21:05
 * @desc
 **/
@ControllerAdvice
@ResponseBody
public class GlobalDefaultExceptionHandler {
    @ExceptionHandler(value = NullPointerException.class)
    public Object NullPointerExceptionHandler(HttpServletRequest request,
                                              NullPointerException exception) throws Exception{
        exception.printStackTrace();
        return ResultUtil.resultBadReturner(exception.getClass().getCanonicalName());
    }

    @ExceptionHandler(value = Exception.class)
    public Object ExceptionHandler(HttpServletRequest request,
                                   Exception exception) throws Exception{
        exception.printStackTrace();
        return ResultUtil.resultBadReturner(exception.getMessage());
    }
}
