package com.gss.datavisualization.model;

import com.gss.datavisualization.enums.EntryState;
import com.gss.datavisualization.enums.ResultState;
import com.gss.datavisualization.util.DateUtil;

/**
 * @create 2018-03-18 21:34
 * @desc
 **/
public class Record {
    private int id;
    private String createTime;
    private int dataSourceId;
    private int result;
    private String errMsg;
    private int deleted;

    public Record() {
    }

    public Record(int data_source_id) {
        this.dataSourceId = data_source_id;
        this.createTime= DateUtil.now();
        this.result= ResultState.SUCCESS;
        this.errMsg="";
        this.deleted= EntryState.USING;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getDataSourceId() {
        return dataSourceId;
    }

    public void setDataSourceId(int dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }
}
