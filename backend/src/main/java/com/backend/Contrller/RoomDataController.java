package com.backend.Contrller;

import com.backend.Model.ChatData;
import com.backend.Model.RoomData;
import com.backend.Model.SendData;
import com.backend.Repository.ChatDataRepository;
import com.backend.Repository.RoomDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class RoomDataController {
    @Autowired
    private RoomDataRepository roomDataRepository;
    @Autowired
    private ChatDataRepository chatDataRepository;
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

    @GetMapping("/chat/overview")
    public ResponseEntity<Map<String,List<SendData>>> getChatDataOverview() {

        Map<String, List<SendData>> roomToChatDataMap = roomDataRepository.findAll().stream()
                .collect(Collectors.toMap(RoomData::getId, this::getChatSendDataList));

        roomToChatDataMap.forEach((key,value) -> {
            if(!value.isEmpty()) {
                value.get(value.size() - 1).setLastMessage(true);
            }
        });

        return roomToChatDataMap.isEmpty()
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(roomToChatDataMap);
    }

    private List<SendData> getChatSendDataList(RoomData roomData) {
        List<SendData> sendDataList;
        sendDataList = chatDataRepository.findAll().stream()
                .filter(chatData -> Objects.equals(roomData.getId(), chatData.getRoomId()))
                .map(chatData -> createSendData(roomData, chatData))
                .toList();

        if(sendDataList.isEmpty()){
            SendData sendData = new SendData();
            sendData.setRoomId(roomData.getId());
            sendData.setRoomName(roomData.getName());
            sendData.setMessage("No Messages");
            sendData.setSenderName("None");
            sendData.setTimestamp(LocalDateTime.MIN);
            sendData.setLastMessage(true);
            sendDataList = new ArrayList<>();
            sendDataList.add(sendData);
        }

        return sendDataList;
    }

    @GetMapping("/chat/newChatData")
    public ResponseEntity<Map<String,List<SendData>>> getNewChatData() {

        Map<String, List<SendData>> roomToChatDataMap = roomDataRepository.findAll().stream()
                .collect(Collectors.toMap(RoomData::getId, this::getChatSendDataList));

        roomToChatDataMap.forEach((key,value) -> {
            if(!value.isEmpty()) {
                value.get(value.size() - 1).setLastMessage(true);
                List<SendData> sendDataList = new ArrayList<>();
                sendDataList.add(value.get(value.size() - 1));
                roomToChatDataMap.replace(key,sendDataList);
            }
        });

        return roomToChatDataMap.isEmpty()
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(roomToChatDataMap);
    }

    private SendData createSendData(RoomData roomData, ChatData chatData) {
        SendData sendData = new SendData();
        sendData.setRoomId(roomData.getId());
        sendData.setRoomName(roomData.getName());
        sendData.setMessage(chatData.getMessage());
        sendData.setSenderName(chatData.getSendUserName());
        sendData.setTimestamp(chatData.getTimestamp());
        sendData.setLastMessage(false);
        return sendData;
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
