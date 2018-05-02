package com.gss.datavisualization.repository;

import com.gss.datavisualization.mongomodel.DealedData;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @create 2018-05-02 7:24
 * @desc
 **/
public interface DealedDataRepository extends MongoRepository<DealedData,String> {
    DealedData findByRecordId(int recordId);
}
