package com.gss.datavisualization.service;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.enums.EntryState;
import com.gss.datavisualization.enums.ResultState;
import com.gss.datavisualization.mapper.*;
import com.gss.datavisualization.model.DataSource;
import com.gss.datavisualization.model.User;
import com.gss.datavisualization.repository.RecordRepository;
import com.gss.datavisualization.returnentity.RecordWithDataSource;
import com.gss.datavisualization.util.DateUtil;
import com.gss.datavisualization.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @create 2018-03-14 16:01
 * @desc
 **/
@Service
public class StatisticService {
    @Autowired
    RecordMapper recordMapper;
    @Autowired
    MerchantDetailMapper merchantDetailMapper;
    @Autowired
    GoodTypeDetailMapper goodTypeDetailMapper;
    @Autowired
    GoodDetailMapper goodDetailMapper;
    @Autowired
    DataSourceMapper dataSourceMapper;
    @Autowired
    DataCollectionService dataCollectionService;
    @Autowired
    UserService userService;

    public Result getRecords(int data_source_id, int record_id){
        List<RecordWithDataSource> recordWithDataSources = null;
        if(data_source_id==0 && record_id==0)
            recordWithDataSources = recordMapper.getRecordsWithDataSource();
        else if(data_source_id!=0)
            recordWithDataSources = recordMapper.getRecordsWithDataSourceByDataSourceId(data_source_id);
        else
            recordWithDataSources = recordMapper.getRecordsWithDataSourceByRecordId(record_id);
        return ResultUtil.resultGoodReturner(recordWithDataSources);
    }

    public Result getRecordsOnlySuccess(int data_source_id,int record_id){
        List<RecordWithDataSource> recordWithDataSources = (List<RecordWithDataSource>)getRecords(data_source_id,record_id).getData();
        for(int i=recordWithDataSources.size()-1;i>=0;i--){
            if(recordWithDataSources.get(i).getResult()!= ResultState.SUCCESS)
                recordWithDataSources.remove(i);
        }
        return ResultUtil.resultGoodReturner(recordWithDataSources);
    }

    public Result getMerchantDetails(int record_id){
        return ResultUtil.resultGoodReturner(merchantDetailMapper.getMerchantDetails(record_id,0,Integer.MAX_VALUE));
    }

    public Result getGoodTypeDetails(int record_id){
        return ResultUtil.resultGoodReturner(goodTypeDetailMapper.getGoodTypeDetails(record_id));
    }

    public Result getGoodDetails(int record_id){
        return ResultUtil.resultGoodReturner(goodDetailMapper.getGoodDetails(record_id));
    }

    public Result getNumOfData(int recordId){
        List list = recordMapper.getRecordsWithDataSourceByRecordId(recordId);
        if(list==null) return ResultUtil.resultBadReturner("该记录不存在");
        return ResultUtil.resultGoodReturner(merchantDetailMapper.getTotal_getMerchantDetails(recordId));
    }

    public Result getData(int recordId,int limit,int offset){
        Map map = new LinkedHashMap();
        map.put("data",merchantDetailMapper.getMerchantDetails(recordId,limit,offset));
        map.put("offset",offset);
        map.put("limit",limit);
        map.put("recordId",recordId);
        return ResultUtil.resultGoodReturner(map);
    }

    public Result getDataSources(HttpServletRequest request) {
        User user = userService.getCookie(request);
        if(user!=null)
            return ResultUtil.resultGoodReturner(dataSourceMapper.getDataSources(user.getId()));
        else
            return ResultUtil.resultBadReturner("用户未登录");
    }

    public Result deleteDataSource(int data_source_id){
        if(dataCollectionService.isCompleted(data_source_id).getMsg().equals("false")){
            return ResultUtil.resultBadReturner("统计中，请稍后重试");
        }
        dataSourceMapper.updateDeleted(data_source_id, EntryState.DELETED);
        recordMapper.updateDeletedWithDataSource(data_source_id,EntryState.DELETED);
        return ResultUtil.resultGoodReturner();
    }

    public Result deleteRecord(int record_id){
        return ResultUtil.resultGoodReturner(recordMapper.updateDeleted(record_id,EntryState.DELETED));
    }

    public Result addDataSource(DataSource dataSource){
        dataSource.setCreateTime(DateUtil.now());
        dataSource.setDeleted(EntryState.USING);
        dataSourceMapper.insertDataSource(dataSource);
        return ResultUtil.resultGoodReturner(dataSource);
    }

    public Result getNewestRecord(int data_source_id){
        return ResultUtil.resultGoodReturner(recordMapper.getNewest(data_source_id));
    }
}
