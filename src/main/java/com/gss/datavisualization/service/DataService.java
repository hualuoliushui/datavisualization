package com.gss.datavisualization.service;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.enums.MongoRecordState;
import com.gss.datavisualization.mongomodel.DealedData;
import com.gss.datavisualization.mongomodel.Record;
import com.gss.datavisualization.repository.DealedDataRepository;
import com.gss.datavisualization.repository.RecordRepository;
import com.gss.datavisualization.util.DateUtil;
import com.gss.datavisualization.util.ResultUtil;
import com.mongodb.Mongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @create 2018-05-02 8:47
 * @desc
 **/
@Service
public class DataService {
    @Autowired
    RecordRepository recordRepository;
    @Autowired
    DealedDataRepository dealedDataRepository;

    public Result checkRecordExist(int recordId){
        Record record = recordRepository.findByRecordId(recordId);
        if(record!=null){
            if(record.getSaved_state()== MongoRecordState.WORKING)
                return ResultUtil.resultBadReturner("正在保存");
            else
                return ResultUtil.resultGoodReturner();
        }
        return ResultUtil.resultBadReturner("数据不存在");
    }

    public Result uploadDealedData(DealedData dealedData){// 两阶段加锁
        Record record = recordRepository.findByRecordId(dealedData.getRecordId());
        if(record!=null){
            if(record.getSaved_state()== MongoRecordState.WORKING)
                return ResultUtil.resultBadReturner("正在保存");
            else
                return ResultUtil.resultBadReturner("数据已存在");
        }
        synchronized (DataService.class){
            record = recordRepository.findByRecordId(dealedData.getRecordId());
            if(record!=null){
                if(record.getSaved_state()== MongoRecordState.WORKING)
                    return ResultUtil.resultBadReturner("正在保存");
                else
                    return ResultUtil.resultBadReturner("数据已存在");
            }
            record = new Record();
            record.setCreateTime(DateUtil.now());
            record.setRecordId(dealedData.getRecordId());
            record.setSaved_state(MongoRecordState.WORKING);
            recordRepository.save(record);
            dealedData.setCreateTime(DateUtil.now());
            dealedDataRepository.save(dealedData);
            record.setSaved_state(MongoRecordState.END);
            recordRepository.save(record);
        }
        return ResultUtil.resultGoodReturner(record);
    }

    public Result getDealedData(int recordId){
        DealedData dealedData = dealedDataRepository.findByRecordId(recordId);
        return ResultUtil.resultGoodReturner(dealedData);
    }
}
