package com.gss.datavisualization.service;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.mapper.UserMapper;
import com.gss.datavisualization.model.User;
import com.gss.datavisualization.util.CookieUtil;
import com.gss.datavisualization.util.DateUtil;
import com.gss.datavisualization.util.EncryptUtil;
import com.gss.datavisualization.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @create 2018-04-27 0:06
 * @desc
 **/
@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    public void setCookie(HttpServletResponse response,User user){
        CookieUtil.addCookie(response,"user",user);
    }

    public User getCookie(HttpServletRequest request){
        return CookieUtil.getCookie(request,"user",User.class);
    }

    public Result checkLogin(HttpServletRequest request){
        User user = getCookie(request);
        if(user!=null)
            return ResultUtil.resultGoodReturner();
        else{
            return ResultUtil.resultBadReturner("未登录");
        }
    }

    public Result checkUserNameUnique(String userName){
        if(userMapper.checkUnique(userName)!=null){
            return ResultUtil.resultBadReturner("用户名已存在");
        }
        return ResultUtil.resultGoodReturner();
    }

    public Result dealRegister(HttpServletResponse response,User user){
        Result ret = checkUserNameUnique(user.getUserName());
        if(ret.getErrCode()!=0)return ret;
        user.setPsw(EncryptUtil.encrypt(user.getPsw()));
        user.setCreateTime(DateUtil.now());
        userMapper.insert(user);
        setCookie(response,user);
        user.setPsw("");
        return ResultUtil.resultGoodReturner(user);
    }

    public Result dealLogin(HttpServletResponse response,User user){
        user.setPsw(EncryptUtil.encrypt(user.getPsw()));
        user = userMapper.find(user);
        if(user==null){
            return ResultUtil.resultBadReturner("用户不存在或密码错误");
        }
        setCookie(response,user);
        user.setPsw("");
        return ResultUtil.resultGoodReturner(user);
    }

    public void logOut(HttpServletResponse response) {
        CookieUtil.removeCookie(response,"user");
    }
}
