package com.gss.datavisualization.mapper;

import com.gss.datavisualization.mapperprovider.GoodDetailMapperProvider;
import com.gss.datavisualization.model.GoodDetail;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

/**
 * @create 2018-03-27 7:58
 * @desc
 **/
@Mapper
@Component(value = "goodDetailMapper")
public interface GoodDetailMapper {
    String tableName = " good_detail_t ";

    @InsertProvider(type = GoodDetailMapperProvider.class,method = "insertAll")
    int insertAll(@Param("list")Collection<com.gss.datavisualization.webservice.GoodDetail> list,
                  @Param("record_id")int recode_id);

    @Select("select * from " + tableName + " where record_id=#{record_id} ")
    List<GoodDetail> getGoodDetails(@Param("record_id")int record_id);

    @SelectProvider(type= GoodDetailMapperProvider.class,method = "getGoodDetailsByType")
    List<GoodDetail> getGoodDetailsByType(@Param("record_id")int record_id,
                                          @Param("good_type_id")int good_type_id);

    @Delete("delete from " + tableName + " where record_id=#{record_id}")
    int deleteGoodDetails(@Param("record_id")int record_id);
}
