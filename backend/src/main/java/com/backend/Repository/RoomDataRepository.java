package com.backend.Repository;

import com.backend.Model.RoomData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomDataRepository extends MongoRepository<RoomData,String> {
}
