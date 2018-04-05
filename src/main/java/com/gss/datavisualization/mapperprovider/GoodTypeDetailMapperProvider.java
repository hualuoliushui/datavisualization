package com.gss.datavisualization.mapperprovider;

import com.gss.datavisualization.mapper.GoodTypeDetailMapper;
import com.gss.datavisualization.webservice.GoodTypeDetail;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

/**
 * @create 2018-03-27 8:03
 * @desc
 **/
public class GoodTypeDetailMapperProvider {
    public String insertAll(Map map){
        List<GoodTypeDetail> goodTypeDetails = (List<GoodTypeDetail>)map.get("list");
        int record_id = (int)map.get("record_id");
        if(goodTypeDetails==null || goodTypeDetails.isEmpty())
            return "";

        StringBuilder sb = new StringBuilder();
        sb.append("insert into")
                .append(GoodTypeDetailMapper.tableName)
                .append("(record_id,good_type_id,merchant_id,type_code,type_name,produce_place) ")
                .append("values");
        MessageFormat mf = new MessageFormat("#'{'list[{0}].{1}'}'");
        for (int i = 0; i < goodTypeDetails.size(); i++) {
            sb.append("(")
                    .append("#{record_id},")
                    .append(mf.format(new Object[]{i,"goodTypeId"})+",")
                    .append(mf.format(new Object[]{i,"merchantId"})+",")
                    .append(mf.format(new Object[]{i,"typeCode"})+",")
                    .append(mf.format(new Object[]{i,"typeName"})+",")
                    .append(mf.format(new Object[]{i,"producePlace"})+" ")
                    .append(")");
            if (i < goodTypeDetails.size() - 1) {
                sb.append(",");
            }
        }
        return sb.toString();
    }
}
