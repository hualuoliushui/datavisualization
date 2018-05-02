package com.gss.datavisualization.repository;

import com.gss.datavisualization.mongomodel.Record;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @create 2018-05-02 7:00
 * @desc
 **/
public interface RecordRepository extends MongoRepository<Record,String> {
    Record findByRecordId(int recordId);
}
