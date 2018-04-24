package com.gss.datavisualization;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ServletComponentScan
@MapperScan(value = "com.gss.datavisualization.mapper")
@EnableTransactionManagement
@EnableScheduling
@EnableAsync
@EnableCaching
public class DataVisualizationApplication {

	public static void main(String[] args) {
		SpringApplication.run(DataVisualizationApplication.class, args);
	}
}
