package com.backend.Contrller;

import com.backend.Model.RoomData;
import com.backend.Repository.RoomDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class RoomDataController {
    @Autowired
    private RoomDataRepository roomDataRepository;

    @GetMapping("/roomData")
    public List<RoomData> getRoomData() {return roomDataRepository.findAll(); }

    @GetMapping("/roomData/{id}")
    public ResponseEntity<RoomData> getRoomDataById(@PathVariable(value = "id")String id){
        return roomDataRepository.findById(id).map(value ->
                        new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/roomData")
    public RoomData createRoomData(@RequestBody RoomData roomData){
        return roomDataRepository.save(roomData);
    }

    @PutMapping("/roomData/{id}")
    public ResponseEntity<RoomData> updateRoomData(
            @PathVariable(value = "id")String id,
            @RequestBody RoomData roomDataDto) {
        Optional<RoomData> roomDataOp = roomDataRepository.findById(id);

        if(roomDataOp.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        RoomData roomData = roomDataOp.get();
        roomData.setName(roomDataDto.getName());
        roomData.setUserIds(roomDataDto.getUserIds());

        final RoomData updateRoomData = roomDataRepository.save(roomData);
        return ResponseEntity.ok(updateRoomData);
    }

    @DeleteMapping("/roomData/{id}")
    public Map<String ,Boolean> deleteChatData(@PathVariable(value = "id")String id){
        Optional<RoomData> roomData = roomDataRepository.findById(id);
        Map<String,Boolean> response = new HashMap<>();

        if(roomData.isEmpty()){
            response.put("RoomData Not Found",Boolean.FALSE);
        }else {
            roomDataRepository.delete(roomData.get());
            response.put("Deleted",Boolean.TRUE);
        }

        return response;
    }


}
