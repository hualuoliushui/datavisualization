package com.gss.datavisualization.mapperprovider;

import com.gss.datavisualization.mapper.MerchantDetailMapper;
import com.gss.datavisualization.webservice.MerchantDetail;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

/**
 * @create 2018-03-20 10:05
 * @desc
 **/
public class MerchantDetailMapperProvider {
    public String insertAll(Map map){
        List<MerchantDetail> merchantDetails = (List<MerchantDetail>)map.get("list");
        int record_id = (int)map.get("record_id");
        if(merchantDetails==null || merchantDetails.isEmpty())
            return "";

        StringBuilder sb = new StringBuilder();
        sb.append("insert into")
                .append(MerchantDetailMapper.tableName)
                .append("(record_id,merchant_id,create_date," +
                        "user_name,merchant_name,company_name,company_area," +
                        "area_code,gis_location" +
                        ",company_code,business_scope) ")
                .append("values");
        MessageFormat mf = new MessageFormat("#'{'list[{0}].{1}'}'");
        for (int i = 0; i < merchantDetails.size(); i++) {
            sb.append("(")
                    .append("#{record_id},")
                    .append(mf.format(new Object[]{String.valueOf(i),"merchantId"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"createDate"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"userName"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"merchantName"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"companyName"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"companyArea"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"areaCode"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"gisLocation"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"companyCode"})+",")
                    .append(mf.format(new Object[]{String.valueOf(i),"businessScope"}))
                    .append(")");
            if (i < merchantDetails.size() - 1) {
                sb.append(",");
            }
        }
        return sb.toString();
    }
}
