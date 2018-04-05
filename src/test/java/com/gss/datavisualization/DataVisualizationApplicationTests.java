package com.gss.datavisualization;

import com.gss.datavisualization.mapper.DataSourceMapper;
import com.gss.datavisualization.model.DataSource;
import com.gss.datavisualization.service.WsClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DataVisualizationApplicationTests {
	@Autowired
	DataSourceMapper dataSourceMapper;
	@Test
	public void contextLoads() {
//		List<DataSource> dataSources = dataSourceMapper.getDataSources();
//		for (DataSource dataSource : dataSources) {
//			WsClient wsClient =new WsClient(dataSource.getHost() + ":" + dataSource.getPort());
//			wsClient.getMerchantDetailList();
//			wsClient.getGoodDetailListResponse();
//		}
	}

}
