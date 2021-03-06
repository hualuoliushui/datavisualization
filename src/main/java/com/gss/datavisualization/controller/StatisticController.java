package com.gss.datavisualization.controller;

import com.gss.datavisualization.model.DataSource;
import com.gss.datavisualization.mongomodel.DealedData;
import com.gss.datavisualization.service.DataCollectionService;
import com.gss.datavisualization.service.DataService;
import com.gss.datavisualization.service.StatisticService;
import com.gss.datavisualization.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sun.misc.Request;

import javax.servlet.http.HttpServletRequest;

/**
 * @create 2018-03-14 16:01
 * @desc
 **/
@RestController
@RequestMapping(value = "/statistic")
@CrossOrigin
public class StatisticController {
    @Autowired
    StatisticService statisticService;
    @Autowired
    DataCollectionService dataCollectionService;
    @Autowired
    DataService dataService;

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

    @RequestMapping(value = "/getRecordsOnlySuccess",method = RequestMethod.GET)
    public Object getRecordsOnlySuccess(@RequestParam(value = "dataSourceId",required = false,defaultValue = "0")int dataSourceId,
                             @RequestParam(value = "recordId",required = false,defaultValue = "0")int recordId){
        return statisticService.getRecordsOnlySuccess(dataSourceId, recordId);
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
//        return ResultUtil.resultGoodReturner(10);
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
    public Object getDataSources(HttpServletRequest request){
        return statisticService.getDataSources(request);
    }

    @RequestMapping(value = "/deleteDataSource",method = RequestMethod.GET)
    public Object deleteDataSource(@RequestParam("dataSourceId")int dataSourceId){
        return statisticService.deleteDataSource(dataSourceId);
    }

    @RequestMapping(value = "/deleteRecord",method = RequestMethod.GET)
    public Object deleteRecord(@RequestParam("recordId")int recordId){
        return statisticService.deleteRecord(recordId);
    }

    @RequestMapping(value = "/checkRecordExist",method = RequestMethod.GET)
    public Object checkRecordExist(@RequestParam(value = "recordId")int recordId){
        return dataService.checkRecordExist(recordId);
    }

    @RequestMapping(value = "/getDealedData",method = RequestMethod.GET)
    public Object getDealedData(@RequestParam(value = "recordId")int recordId){
        return dataService.getDealedData(recordId);
    }

    @RequestMapping(value="/uploadDealedData",method = RequestMethod.POST)
    public Object uploadDealedData(@RequestBody DealedData dealedData){
        return dataService.uploadDealedData(dealedData);
    }
}
