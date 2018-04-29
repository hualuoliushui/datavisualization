package com.gss.datavisualization.mapper;

import com.gss.datavisualization.enums.EntryState;
import com.gss.datavisualization.enums.RecordState;
import com.gss.datavisualization.model.Record;
import com.gss.datavisualization.returnentity.RecordWithDataSource;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @create 2018-03-18 21:43
 * @desc
 **/
@Mapper
@Component(value = "recordMapper")
public interface RecordMapper {
    String tableName = "record_t";
    String sql_getRecordsWithDataSource = "select * from " + tableName + " as r join " + DataSourceMapper.tableName + " as d " +
            "on r.dataSourceId=d.id ";

    @Insert("insert into " + tableName + "(createTime,dataSourceId,result,deleted) " +
            "values(#{createTime},#{dataSourceId},#{result}," + RecordState.INIT+ ")")
    @Options(useGeneratedKeys=true,keyColumn = "id")
    int insertRecord(Record record);

    @Update("update " + tableName + " set result=#{result},errMsg=#{errMsg},deleted=" +RecordState.COLLECTED + " " +
            "where id=#{id} " )
    int updateErrMsg(Record record);

    @Update("update " + tableName + " set deleted=#{deleted} where id=#{id}")
    int updateDeleted(@Param("id")int id,
                      @Param("deleted")int deleted);
    @Update("update " + tableName + " set deleted=#{deleted} where dataSourceId=#{dataSourceId}")
    int updateDeletedWithDataSource(@Param("dataSourceId")int dataSourceId,
                                    @Param("deleted")int deleted);

    @Select("select * from " + tableName +" " +
            "where deleted="+RecordState.COLLECTED)
    List<Record> getRecords();


    @Select(sql_getRecordsWithDataSource + " where r.deleted="+RecordState.COLLECTED)
    List<RecordWithDataSource> getRecordsWithDataSource();

    @Select(sql_getRecordsWithDataSource + " where d.id=#{dataSourceId} and r.deleted="+RecordState.COLLECTED)
    List<RecordWithDataSource> getRecordsWithDataSourceByDataSourceId(@Param("dataSourceId")int dataSourceId);

    @Select(sql_getRecordsWithDataSource + " where r.id=#{recordId} and r.deleted="+RecordState.COLLECTED)
    List<RecordWithDataSource> getRecordsWithDataSourceByRecordId(@Param("recordId")int recordId);

    @Select("select * from "+tableName+" where dataSourceId=#{dataSourceId} and deleted="+RecordState.COLLECTED +
            " order by UNIX_TIMESTAMP(createTime) desc limit 1")
    Record getNewest(@Param("dataSourceId")int dataSourceId);
}
