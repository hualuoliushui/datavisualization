package com.gss.datavisualization.controller;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.service.StatisticService;
import com.gss.datavisualization.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @create 2018-03-01 9:30
 * @desc index
 **/
@Controller
public class IndexController {
    @Autowired
    StatisticService statisticService;
    @Autowired
    UserService userService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public Object index(Map<String,Object> map,
                        @RequestParam(value = "data_source_id",required = false,defaultValue = "0")int data_source_id,
                        @RequestParam(value = "record_id",required = false,defaultValue = "0")int record_id){
        map.put("records",statisticService.getRecordsOnlySuccess(data_source_id,record_id).getData());
        return "index";
    }

    @RequestMapping(value = "record",method = RequestMethod.GET)
    public Object record(HttpServletRequest request,
                         Map<String, Object> map){
        Result result = userService.checkLogin(request);
        if(result.getErrCode()!=0){
            return new ModelAndView("/user/login");
        }
        return "record";
    }
}
