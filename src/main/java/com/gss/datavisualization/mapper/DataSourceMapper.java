package com.gss.datavisualization.mapper;

import com.gss.datavisualization.enums.EntryState;
import com.gss.datavisualization.model.DataSource;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @create 2018-03-14 15:56
 * @desc
 **/
@Mapper
@Component(value = "dataSourceMapper")
public interface DataSourceMapper {
    String tableName = "data_source_t";

    @Insert("insert into " + tableName + "(host,port,createTime,deleted,userId) " +
            "values(#{host},#{port},#{createTime},#{deleted},#{userId})")
    @Options(useGeneratedKeys=true,keyColumn = "id")
    int insertDataSource(DataSource dataSource);

    @Select("select * from " + tableName + " " +
            "where deleted="+EntryState.USING + " and userId=#{userId}")
    List<DataSource> getDataSources(@Param("userId")int userId);

    @Select("select * from " + tableName + " " +
            "where id=#{id} and deleted=" + EntryState.USING +" limit 1")
    DataSource getDataSource(@Param("id")int id);

    @Update("update " + tableName + " set deleted=#{deleted} where id=#{id}")
    int updateDeleted(@Param("id")int id,@Param("deleted")int deleted);
}
