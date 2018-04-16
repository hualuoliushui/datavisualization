package com.gss.datavisualization.service;

import com.gss.datavisualization.entity.Result;
import com.gss.datavisualization.enums.RecordState;
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
 * @create 2018-03-30 16:12
 * @desc
 **/
@Service
public class AsyncService {
    @Autowired
    DataSourceMapper dataSourceMapper;
    @Autowired
    RecordMapper recordMapper;
    @Autowired
    MerchantDetailMapper merchantDetailMapper;
    @Autowired
    GoodTypeDetailMapper goodTypeDetailMapper;
    @Autowired
    GoodDetailMapper goodDetailMapper;

    private static Logger logger = LoggerFactory.getLogger(DataCollectionService.class);

    private int record_id=0;

    public int getRecord_id() {
        return record_id;
    }

    public void setRecord_id(int record_id) {
        this.record_id = record_id;
    }



    void dealMerchantDetailList(List<MerchantDetail> merchantDetails)
    {
        int ret = 0;
        if(merchantDetails!=null && !merchantDetails.isEmpty()){
            logger.info("merchantDetails.size:"+merchantDetails.size());
            logger.info("record_id:"+getRecord_id());
            ret = merchantDetailMapper.insertAll(merchantDetails,getRecord_id());
            logger.info("merchantDetailMapper.insertAll ret:" + ret);
        }
    }

    void dealGoodTypeDetailList(List<GoodTypeDetail> goodTypeDetails)
    {
        int ret = 0;
        if(goodTypeDetails!=null && !goodTypeDetails.isEmpty()){
            logger.info("goodTypeDetails.size:"+goodTypeDetails.size());
            logger.info("record_id:"+getRecord_id());
            ret = goodTypeDetailMapper.insertAll(goodTypeDetails,getRecord_id());
            logger.info("goodTypeDetailMapper.insertAll ret:" + ret);
            for (GoodTypeDetail goodTypeDetail : goodTypeDetails) {
                dealGoodDetailList(goodTypeDetail.getGoodDetails());
            }
        }
    }

    void dealGoodDetailList(List<GoodDetail> goodDetails)
    {
        int ret = 0;
        if(goodDetails!=null && !goodDetails.isEmpty()){
            logger.info("goodDetails.size:"+goodDetails.size());
            logger.info("record_id:"+getRecord_id());
            ret = goodDetailMapper.insertAll(goodDetails,getRecord_id());
            logger.info("goodDetailMapper.insertAll ret:" + ret);
        }
    }

    void work(int dataSourceId){
        DataSource dataSource = dataSourceMapper.getDataSource(dataSourceId);
        if(dataSource==null)
            throw new RuntimeException("该数据源不存在");
        Record record = new Record(dataSourceId);
        try{
            recordMapper.insertRecord(record);
            setRecord_id(record.getId());
            WsClient wsClient =new WsClient(dataSource.getHost() + ":" + dataSource.getPort());
            GetMerchantDetailListResponse getMerchantDetailListResponse = wsClient.getMerchantDetailList();
            if(getMerchantDetailListResponse!=null)
                dealMerchantDetailList(getMerchantDetailListResponse.getMerchantDetails());
            GetGoodDetailListResponse getGoodDetailListResponse = wsClient.getGoodDetailListResponse();
            if(getGoodDetailListResponse!=null)
                dealGoodTypeDetailList(getGoodDetailListResponse.getGoodTypeDetails());
            recordMapper.updateDeleted(record.getId(), RecordState.COLLECTED);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            record.setResult(ResultState.FAIL);
            record.setErrMsg(e.getMessage());
            recordMapper.updateErrMsg(record);
        }
    }

    @Async
    public void collecting(int dataSourceId){
        try{
            DataCollectionService.setIsCollecting(dataSourceId);
            work(dataSourceId);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            DataCollectionService.endCollected(dataSourceId);
        }
    }


}
