package com.gss.datavisualization.model;

/**
 * @create 2018-03-14 15:58
 * @desc
 **/
public class DataSource {
    private int id;
    private String host;
    private int port;
    private String createTime;
    private int deleted;

    @Override
    public String toString() {
        return "DataSource{" +
                "id=" + id +
                ", host='" + host + '\'' +
                ", port=" + port +
                ", createTime='" + createTime + '\'' +
                ", deleted=" + deleted +
                '}';
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

}
