package com.gss.datavisualization.mongomodel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @create 2018-05-02 6:33
 * @desc
 **/
@Document
public class Record {
    @Id
    private String id;
    private int saved_state;//1 未完成；2 已完成
    @Indexed
    private int recordId;// mysql中record表中的id
    private String createTime;

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }

    public int getSaved_state() {
        return saved_state;
    }

    public void setSaved_state(int saved_state) {
        this.saved_state = saved_state;
    }
}
