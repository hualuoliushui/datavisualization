package com.gss.datavisualization.mapperprovider;

import com.gss.datavisualization.mapper.GoodDetailMapper;
import com.gss.datavisualization.webservice.GoodDetail;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

/**
 * @create 2018-03-27 8:06
 * @desc
 **/
public class GoodDetailMapperProvider {
    public String insertAll(Map map){
        List<GoodDetail> goodDetails = (List<GoodDetail>)map.get("list");
        int record_id = (int)map.get("record_id");
        if(goodDetails==null || goodDetails.isEmpty())
            return "";

        StringBuilder sb = new StringBuilder();
        sb.append("insert into")
                .append(GoodDetailMapper.tableName)
                .append("(record_id,good_id,good_type_id," +
                        "good_batch,good_code,pack_type," +
                        "good_number,produce_date,life_time," +
                        "qr_code_num) ")
                .append("values");
        MessageFormat mf = new MessageFormat("#'{'list[{0}].{1}'}'");
        for (int i = 0; i < goodDetails.size(); i++) {
            sb.append("(")
                    .append("#{record_id},")
                    .append(mf.format(new Object[]{i,"goodId"})+",")
                    .append(mf.format(new Object[]{i,"goodTypeId"})+",")
                    .append(mf.format(new Object[]{i,"goodBatch"})+",")
                    .append(mf.format(new Object[]{i,"goodCode"})+",")
                    .append(mf.format(new Object[]{i,"packType"})+",")
                    .append(mf.format(new Object[]{i,"goodNumber"})+",")
                    .append(mf.format(new Object[]{i,"produceDate"})+",")
                    .append(mf.format(new Object[]{i,"lifeTime"})+",")
                    .append(mf.format(new Object[]{i,"qrCodeNum"})+" ")
                    .append(")");
            if (i < goodDetails.size() - 1) {
                sb.append(",");
            }
        }
        return sb.toString();
    }

    public String getGoodDetailsByType(Map map){
        StringBuilder sb = new StringBuilder();
        sb.append("select * from " + GoodDetailMapper.tableName + " where record_id=#{record_id} and good_type_id=#{good_type_id}");
        return sb.toString();
    }
}
