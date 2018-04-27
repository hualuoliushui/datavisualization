package com.gss.datavisualization.controller;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.model.User;
import com.gss.datavisualization.service.UserService;
import com.gss.datavisualization.util.ResultUtil;
import com.sun.tools.classfile.Annotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * @create 2018-04-27 0:04
 * @desc
 **/
@RequestMapping(value = "/user")
@Controller
public class UserController {
    @Autowired
    UserService userService;
    @RequestMapping(value = "/checkUserNameUnique",method = RequestMethod.GET)
    @ResponseBody
    public Object checkUserNameUnique(@RequestParam(value = "userName")String userName){
        return userService.checkUserNameUnique(userName);
    }

    @RequestMapping(value = "/dealRegister",method = RequestMethod.POST)
    @ResponseBody
    public Object dealRegister(HttpServletResponse response,@RequestBody User user){
        Result result=userService.dealRegister(response,user);
        return result;
    }

    @RequestMapping(value = "/dealLogin",method = RequestMethod.POST)
    @ResponseBody
    public Object dealLogin(HttpServletResponse response, @RequestBody User user){
        Result result = userService.dealLogin(response,user);
        return result;
    }

    @RequestMapping(value = "/dealLogOut",method = RequestMethod.GET)
    public Object dealLogOut(HttpServletResponse response){
        userService.logOut(response);
        return "login";
    }

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public Object login(Map<String,Object> map){
        return "login";
    }
}
