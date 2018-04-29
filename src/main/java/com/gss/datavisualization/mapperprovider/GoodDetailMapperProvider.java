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
                        "qr_code_num,star_avg) ")
                .append("values");
        MessageFormat mf = new MessageFormat("#'{'list[{0}].{1}'}'");
        for (int i = 0; i < goodDetails.size(); i++) {
            sb.append("(")
                    .append("#{record_id},")
                    .append(mf.format(new Object[]{String.valueOf(i),"goodId"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"goodTypeId"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"goodBatch"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"goodCode"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"packType"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"goodNumber"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"produceDate"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"lifeTime"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"qrCodeNum"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"starAvg"})+" ")
                    .append(")");
            if (i < goodDetails.size() - 1) {
                sb.append(",");
            }
        }
        return sb.toString();
    }

    public String getGoodDetailsByType(Map map){
        StringBuilder sb = new StringBuilder();
        sb.append("select good_number,produce_date from " + GoodDetailMapper.tableName + " where record_id=#{record_id} and good_type_id=#{good_type_id}");
        return sb.toString();
    }
}
