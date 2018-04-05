package com.gss.datavisualization.returnentity;

import com.gss.datavisualization.model.Record;

/**
 * @create 2018-03-20 12:27
 * @desc
 **/
public class RecordWithDataSource extends Record {
    private String host;
    private String port;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }
}
