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

    @Select("select * from " + tableName + " where record_id=#{record_id} ")
    List<MerchantDetail> getMerchantDetails(@Param("record_id")int record_id);

    @Delete("delete from " + tableName + " where record_id=#{record_id}")
    int deleteMerchantDetails(@Param("record_id")int record_id);
}
