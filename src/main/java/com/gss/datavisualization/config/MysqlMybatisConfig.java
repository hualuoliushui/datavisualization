package com.gss.datavisualization.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * @create 2018-05-01 22:28
 * @desc
 **/
//@Configuration
//@MapperScan(basePackages = "com.gss.datavisualization.mapper")
public class MysqlMybatisConfig {
    @Autowired
    @Qualifier("mysqlDataSource")
    private DataSource mysqlDataSource;

    @Bean
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(mysqlDataSource);
        return sessionFactory.getObject();
    }
}
