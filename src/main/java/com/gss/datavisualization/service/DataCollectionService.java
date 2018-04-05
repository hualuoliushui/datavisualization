package com.gss.datavisualization.service;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.enums.ResultState;
import com.gss.datavisualization.mapper.*;
import com.gss.datavisualization.model.DataSource;
import com.gss.datavisualization.model.Record;
import com.gss.datavisualization.util.ResultUtil;
import com.gss.datavisualization.webservice.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @create 2018-03-14 16:03
 * @desc
 **/
@Service
public class DataCollectionService {
    @Autowired
    AsyncService asyncService;
    @Autowired
    StatisticService statisticService;
    private static Set<Integer> isCollecting = new HashSet<>();

    boolean isCollecting(int dataSourceId){
        return isCollecting.contains(dataSourceId);
    }

    static void setIsCollecting(int dataSourceId){
        isCollecting.add(dataSourceId);
    }

    static void resetIsCollecting(int dataSourceId){
        isCollecting.remove(dataSourceId);
    }

    public Result startCollecting(int dataSourceId ){

        if(isCollecting(dataSourceId))
            return ResultUtil.resultBadReturner("上一个统计未结束，请稍后再试");
        asyncService.collecting(dataSourceId);
        return ResultUtil.resultGoodReturner("统计开始");
    }

    public static void endCollected(int dataSourceId){
        resetIsCollecting(dataSourceId);
    }

    public Result isCompleted(int data_source_id) {
        if(isCollecting(data_source_id))
            return ResultUtil.resultReturner(0,"false",null);
        else
            return ResultUtil.resultReturner(0,"true",statisticService.getNewestRecord(data_source_id).getData());
    }
}
