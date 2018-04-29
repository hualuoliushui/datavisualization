package com.gss.datavisualization.mapper;

import com.gss.datavisualization.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

/**
 * @create 2018-04-26 23:54
 * @desc
 **/
@Mapper
@Component(value = "userMapper")
public interface UserMapper {
    String tableName = "user_t";

    @Insert("insert into " + tableName + "(createTime,userName,psw) " +
            "values(#{createTime},#{userName},#{psw})")
    @Options(useGeneratedKeys=true,keyColumn = "id")
    int insert(User user);

    @Select("select * from " + tableName + " where userName=#{userName} and psw=#{psw}")
    User find(User user);

    @Select("select * from " + tableName + " where userName=#{userName} ")
    User checkUnique(@Param("userName")String userName);
}
