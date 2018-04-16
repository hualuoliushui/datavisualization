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
            "on r.data_source_id=d.id ";

    @Insert("insert into " + tableName + "(create_time,data_source_id,result,deleted) " +
            "values(#{createTime},#{dataSourceId},#{result}," + RecordState.INIT+ ")")
    @Options(useGeneratedKeys=true,keyColumn = "id")
    int insertRecord(Record record);

    @Update("update " + tableName + " set result=#{result},err_msg=#{errMsg},deleted=" +RecordState.COLLECTED + " " +
            "where id=#{id} " )
    int updateErrMsg(Record record);

    @Update("update " + tableName + " set deleted=#{deleted} where id=#{id}")
    int updateDeleted(@Param("id")int id,
                      @Param("deleted")int deleted);
    @Update("update " + tableName + " set deleted=#{deleted} where data_source_id=#{data_source_id}")
    int updateDeletedWithDataSource(@Param("data_source_id")int data_source_id,
                                    @Param("deleted")int deleted);

    @Select("select * from " + tableName +" " +
            "where deleted="+RecordState.COLLECTED)
    List<Record> getRecords();


    @Select(sql_getRecordsWithDataSource + " where r.deleted="+RecordState.COLLECTED)
    List<RecordWithDataSource> getRecordsWithDataSource();

    @Select(sql_getRecordsWithDataSource + " where d.id=#{data_source_id} and r.deleted="+RecordState.COLLECTED)
    List<RecordWithDataSource> getRecordsWithDataSourceByDataSourceId(@Param("data_source_id")int data_source_id);

    @Select(sql_getRecordsWithDataSource + " where r.id=#{record_id} and r.deleted="+RecordState.COLLECTED)
    List<RecordWithDataSource> getRecordsWithDataSourceByRecordId(@Param("record_id")int record_id);

    @Select("select * from "+tableName+" where data_source_id=#{data_source_id} and deleted="+RecordState.COLLECTED +
            " order by UNIX_TIMESTAMP(create_time) desc limit 1")
    Record getNewest(@Param("data_source_id")int data_source_id);
}
