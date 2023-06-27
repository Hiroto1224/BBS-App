package com.backend.Contrller;

import com.backend.Model.ChatData;
import com.backend.Model.RoomData;
import com.backend.Model.SideBarData;
import com.backend.Model.User;
import com.backend.Repository.RoomDataRepository;
import com.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class RoomDataController {
    @Autowired
    private RoomDataRepository roomDataRepository;
    @Autowired
    private ChatController chatController;
    @Autowired
    private UserController userController;

    @GetMapping("/roomData")
    public List<RoomData> getRoomData() {return roomDataRepository.findAll(); }

    @GetMapping("/roomData/{id}")
    public ResponseEntity<RoomData> getRoomDataById(@PathVariable(value = "id")String id){
        return roomDataRepository.findById(id).map(value ->
                        new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/roomData/sideBar")
    public List<SideBarData> getSideBarData(){
        List<SideBarData> sideBarDataList = new ArrayList<>();

        List<RoomData> roomDataList = roomDataRepository.findAll();

        roomDataList.forEach(roomData -> {
            Optional<ChatData> chatData = chatController.getLastChatData(roomData.getId());
            if(chatData.isPresent()) {
                User user = userController.getUserById(chatData.get().getSendUserId()).getBody();
                SideBarData sideBarData = new SideBarData(roomData.getId(), roomData.getName(), chatData.get().getMessage(), Objects.requireNonNull(user).getFirstName());

                sideBarDataList.add(sideBarData);
            }else{
                SideBarData sideBarData = new SideBarData(roomData.getId(), roomData.getName(), "", "");

                sideBarDataList.add(sideBarData);
            }
        });

        return sideBarDataList;
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
