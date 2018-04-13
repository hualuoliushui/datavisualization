package com.gss.datavisualization.controller;

import com.gss.datavisualization.model.DataSource;
import com.gss.datavisualization.service.DataCollectionService;
import com.gss.datavisualization.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sun.misc.Request;

/**
 * @create 2018-03-14 16:01
 * @desc
 **/
@RestController
@RequestMapping(value = "/statistic")
public class StatisticController {
    @Autowired
    StatisticService statisticService;
    @Autowired
    DataCollectionService dataCollectionService;

    @RequestMapping(value = "/addDataSource",method = RequestMethod.POST, consumes="application/json")
    @ResponseBody
    public Object addDataSource(@RequestBody DataSource dataSource){
        return statisticService.addDataSource(dataSource);
    }

    @RequestMapping(value = "/startDataCollecting",method = RequestMethod.GET)
    public Object startDataCollecting(@RequestParam("dataSourceId")int dataSourceId){
        return dataCollectionService.startCollecting(dataSourceId);
    }

    @RequestMapping(value = "/isCompleted",method = RequestMethod.GET)
    public Object isCompleted(@RequestParam("dataSourceId")int dataSourceId){
        return dataCollectionService.isCompleted(dataSourceId);
    }

    @RequestMapping(value = "/getRecords",method = RequestMethod.GET)
    public Object getRecords(@RequestParam(value = "dataSourceId",required = false,defaultValue = "0")int dataSourceId,
                             @RequestParam(value = "recordId",required = false,defaultValue = "0")int recordId){
        return statisticService.getRecords(dataSourceId, recordId);
    }

    @RequestMapping(value = "/getMerchantDetails",method = RequestMethod.GET)
    public Object getMerchantDetails(@RequestParam("recordId")int recordId){
        return statisticService.getMerchantDetails(recordId);
    }

    @RequestMapping(value = "/getGoodTypeDetails",method = RequestMethod.GET)
    public Object getGoodTypeDetails(@RequestParam("recordId")int recordId){
        return statisticService.getGoodTypeDetails(recordId);
    }

    @RequestMapping(value="/getNumOfData",method = RequestMethod.GET)
    public Object getNumOfData(@RequestParam("recordId")int recordId){
        return statisticService.getNumOfData(recordId);
    }

    @RequestMapping(value = "/getData",method = RequestMethod.GET)
    public Object getData(@RequestParam("recordId")int recordId,
                          @RequestParam(value = "limit",required = false,defaultValue = "2147483647")int limit,
                          @RequestParam(value = "offset",required = false,defaultValue = "0")int offset){
        return statisticService.getData(recordId,limit,offset);
    }

    @RequestMapping(value = "/getGoodDetails",method = RequestMethod.GET)
    public Object getGoodDetails(@RequestParam("recordId")int recordId){
        return statisticService.getGoodDetails(recordId);
    }

    @RequestMapping(value = "/getDataSources",method = RequestMethod.GET)
    public Object getDataSources(){
        return statisticService.getDataSources();
    }

    @RequestMapping(value = "/deleteDataSource",method = RequestMethod.GET)
    public Object deleteDataSource(@RequestParam("dataSourceId")int dataSourceId){
        return statisticService.deleteDataSource(dataSourceId);
    }

    @RequestMapping(value = "/deleteRecord",method = RequestMethod.GET)
    public Object deleteRecord(@RequestParam("recordId")int recordId){
        return statisticService.deleteRecord(recordId);
    }
}
