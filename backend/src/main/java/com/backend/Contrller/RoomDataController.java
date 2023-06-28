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

import java.util.*;

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
    public ResponseEntity<Map<String,SendData>> getChatDataOverview() {

        List<RoomData> roomDataList = roomDataRepository.findAll();
        List<ChatData> chatDataList = chatDataRepository.findAll();

        Map<String ,SendData> sendDataMap = new HashMap<>();
        roomDataList.forEach(roomData -> {
            chatDataList.forEach(chatData -> {
                SendData sendData = new SendData();
                sendData.setRoomId(roomData.getId());
                sendData.setRoomName(roomData.getName());
                sendData.setMessage(chatData.getMessage());
                sendData.setSenderName(chatData.getSendUserName());
                sendData.setLastMessage(false);
               sendDataMap.put(roomData.getId(), sendData);

            });
        });


        chatDataList.forEach(chatData -> {
            SendData sendData = sendDataMap.get(chatData.getRoomId());
            sendData.setMessage(chatData.getMessage());
            sendData.setSenderName(chatData.getSendUserName());
            sendData.setTimestamp(chatData.getTimestamp());
        });

        if(!sendDataMap.isEmpty()){
            return ResponseEntity.ok(sendDataMap);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

   /*     {
            Optional<ChatData> chatData = chatController.getLastChatData(roomData.getId());
            if(chatData.isPresent()) {
                SendData sendData = new SendData(
                        roomData.getId(),
                        roomData.getName(),
                        chatData.get().getMessage(),
                        chatData.get().getSendUserId(),
                        chatData.get().getTimestamp(),
                        true);

                sendDataList.add(sendData);
            }else{
                SendData sendData = new SendData(
                        roomData.getId(),
                        roomData.getName(),
                        "",
                        "",
                        LocalDateTime.MIN,
                        false);

                sendDataList.add(sendData);
            }
        if(!sendDataList.isEmpty()){
            return ResponseEntity.ok(sendDataList);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    private SendData createSendDataFromRoom(RoomData roomData){
        Optional<ChatData> chatDataOp = chatController.getLastChatData()
    }

    @GetMapping("/chat/")
    public ResponseEntity<List<SendData>> getSideBarData(){
        List<SendData> sendDataList = new ArrayList<>();

        List<RoomData> roomDataList = roomDataRepository.findAll();

        roomDataList.forEach(roomData -> {
            Optional<ChatData> chatData = chatController.getLastChatData(roomData.getId());
            if (chatData.isPresent()) {
                SendData sendData = new SendData(
                        roomData.getId(),
                        roomData.getName(),
                        chatData.get().getMessage(),
                        chatData.get().getSendUserId(),
                        chatData.get().getTimestamp());

                sendDataList.add(sendData);
            } else {
                SendData sendData = new SendData(
                        roomData.getId(),
                        roomData.getName(),
                        "",
                        "",
                        LocalDateTime.MIN);

                sendDataList.add(sendData);
            }
        });
        if(!sendDataList.isEmpty()){
            return ResponseEntity.ok(sendDataList);
        }else {
            return ResponseEntity.notFound().build();
        }
    }*/

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
