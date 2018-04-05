package com.gss.datavisualization.service;

import com.gss.datavisualization.entity.Result;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.constraints.AssertTrue;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
public class DataCollectionServiceTest {
    @Autowired
    DataCollectionService dataCollectionService;

    @Test
    public void startCollecting() {
        Result result = dataCollectionService.startCollecting(1);
        Assert.assertTrue(result.getErrCode() == 0);
    }
}