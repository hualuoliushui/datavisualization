package com.gss.datavisualization.model;

import java.util.List;

/**
 * @create 2018-03-29 9:57
 * @desc
 **/
public class MerchantDetail extends com.gss.datavisualization.webservice.MerchantDetail {
    private int recordId;

    private List<GoodTypeDetail> goodTypeDetails;

    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }

    public List<GoodTypeDetail> getGoodTypeDetails() {
        return goodTypeDetails;
    }

    public void setGoodTypeDetails(List<GoodTypeDetail> goodTypeDetails) {
        this.goodTypeDetails = goodTypeDetails;
    }
}
