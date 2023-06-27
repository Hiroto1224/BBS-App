package com.backend.Repository;

import com.backend.Model.ChatData;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ChatDataRepository extends MongoRepository<ChatData,String > {
                List<ChatData> findByRoomId(String roomId);

}
