package com.gss.datavisualization.service;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.enums.EntryState;
import com.gss.datavisualization.mapper.*;
import com.gss.datavisualization.model.DataSource;
import com.gss.datavisualization.returnentity.RecordWithDataSource;
import com.gss.datavisualization.util.DateUtil;
import com.gss.datavisualization.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

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

    public Result getMerchantDetails(int record_id){
        return ResultUtil.resultGoodReturner(merchantDetailMapper.getMerchantDetails(record_id));
    }

    public Result getGoodTypeDetails(int record_id){
        return ResultUtil.resultGoodReturner(goodTypeDetailMapper.getGoodTypeDetails(record_id));
    }

    public Result getGoodDetails(int record_id){
        return ResultUtil.resultGoodReturner(goodDetailMapper.getGoodDetails(record_id));
    }

    public Result getData(int recordId){
        List<Object> list = new LinkedList<>();
        list.add(merchantDetailMapper.getMerchantDetails(recordId));
        list.add(goodTypeDetailMapper.getGoodTypeDetails(recordId));
        return ResultUtil.resultGoodReturner(list);
    }

    public Result getDataSources() {
        return ResultUtil.resultGoodReturner(dataSourceMapper.getDataSources());
    }

    public Result deleteDataSource(int data_source_id){
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
