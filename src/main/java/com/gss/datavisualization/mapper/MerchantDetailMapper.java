package com.gss.datavisualization.mapper;

import com.gss.datavisualization.mapperprovider.MerchantDetailMapperProvider;
import com.gss.datavisualization.model.MerchantDetail;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

/**
 * @create 2018-03-20 9:25
 * @desc
 **/
@Mapper
@Component(value = "merchantDetailMapper")
public interface MerchantDetailMapper {
    String tableName = " merchant_detail_t ";

    @InsertProvider(type = MerchantDetailMapperProvider.class,method = "insertAll")
    int insertAll(@Param("list")Collection<com.gss.datavisualization.webservice.MerchantDetail> list,
                  @Param("record_id")int recode_id);
    String sql_getMerchantDetails = " from " + tableName + " where record_id=#{record_id} ";

    @Select("select count(*) " + sql_getMerchantDetails)
    int getTotal_getMerchantDetails(@Param("record_id")int record_id);

    @Select("select record_id,merchant_id,create_date,company_area " + sql_getMerchantDetails + " limit #{limit} offset #{offset} ")
    @Results({
            @Result(column = "record_id",property = "recordId"),
            @Result(column = "merchant_id",property = "merchantId"),
            @Result(property = "goodTypeDetails", column = "{record_id=record_id,merchant_id=merchant_id}", many =
            @Many(select = "com.gss.datavisualization.mapper.GoodTypeDetailMapper.getGoodTypeDetailsByMerchant")
            )
    })
    List<MerchantDetail> getMerchantDetails(@Param("record_id")int record_id,
                                            @Param("limit")int limit,
                                            @Param("offset")int offset);

    @Delete("delete from " + tableName + " where record_id=#{record_id}")
    int deleteMerchantDetails(@Param("record_id")int record_id);
}
