package com.gss.datavisualization.service;

import com.gss.datavisualization.webservice.*;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * @create 2018-03-14 16:06
 * @desc
 **/
public class WsClient extends WebServiceGatewaySupport {
    private URL wsdl_url;
    private StatisticPort statisticPort;
    public WsClient(String uri){
        StatisticPortService statisticPortService=null;
        try {
            wsdl_url = new URL("http://" + uri + "/ws/statistic.wsdl");
            statisticPortService = new StatisticPortService(wsdl_url);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("连接数据源失败");
        }

        statisticPort = statisticPortService.getStatisticPortSoap11();
    }

    public GetMerchantDetailListResponse getMerchantDetailList(){
        return statisticPort.getMerchantDetailList(new GetMerchantDetailListRequest());
    }

    public GetGoodDetailListResponse getGoodDetailListResponse(){
        return statisticPort.getGoodDetailList(new GetGoodDetailListRequest());
    }
}
