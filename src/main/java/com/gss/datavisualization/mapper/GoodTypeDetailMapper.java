package com.gss.datavisualization.mapper;

import com.gss.datavisualization.mapperprovider.GoodTypeDetailMapperProvider;
import com.gss.datavisualization.model.GoodTypeDetail;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

/**
 * @create 2018-03-27 7:58
 * @desc
 **/
@Mapper
@Component(value = "goodTypeDetailMapper")
public interface GoodTypeDetailMapper {
    String tableName = " good_type_detail_t ";

    @InsertProvider(type = GoodTypeDetailMapperProvider.class,method = "insertAll")
    int insertAll(@Param("list")Collection<com.gss.datavisualization.webservice.GoodTypeDetail> list,
                  @Param("record_id")int recode_id);

    @Select("select * from " + tableName + " where record_id=#{record_id} ")
    @Results({
            @Result(column = "record_id",property = "recordId"),
            @Result(column = "good_type_id",property = "goodTypeId"),
            @Result(property = "goodDetails", column = "{record_id=record_id,good_type_id=good_type_id}", many =
            @Many(select = "com.gss.datavisualization.mapper.GoodDetailMapper.getGoodDetailsByType")
            )
    })
    List<GoodTypeDetail> getGoodTypeDetails(@Param("record_id")int record_id);

    @Select("select * from " + tableName + " where record_id=#{record_id} and merchant_id=#{merchant_id} ")
    @Results({
            @Result(column = "record_id",property = "recordId"),
            @Result(column = "good_type_id",property = "goodTypeId"),
            @Result(property = "goodDetails", column = "{record_id=record_id,good_type_id=good_type_id}", many =
            @Many(select = "com.gss.datavisualization.mapper.GoodDetailMapper.getGoodDetailsByType")
            )
    })
    List<GoodTypeDetail> getGoodTypeDetailsByMerchant(@Param("record_id")int record_id,
                                                      @Param("merchant_id")int merchant_id);

    @Delete("delete from " + tableName + " where record_id=#{record_id}")
    int deleteGoodTypeDetails(@Param("record_id")int record_id);
}
