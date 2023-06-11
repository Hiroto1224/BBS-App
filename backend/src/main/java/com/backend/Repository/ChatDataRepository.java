package com.backend.Repository;

import com.backend.Model.ChatData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatDataRepository extends MongoRepository<ChatData,String > {
}
