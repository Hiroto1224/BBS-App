package com.backend.Contrller;


import com.backend.Model.ChatData;
import com.backend.Repository.ChatDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ChatDataRepository chatDataRepository;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate,ChatDataRepository chatDataRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.chatDataRepository = chatDataRepository;

    }

    @GetMapping("/chatData")
    public List<ChatData> getChatData() {
        simpMessagingTemplate.convertAndSend("/topic/app",chatDataRepository.findAll());
        return chatDataRepository.findAll();
    }

    @GetMapping("/chatData/{id}")
    public ResponseEntity<ChatData> getChatDataById(@PathVariable(value = "id")String id){
        return chatDataRepository.findById(id).map(value ->
                new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/roomData/{id}/ChatData")
    public List<ChatData> getChatDataByRoomId(@PathVariable(value = "id")String id){
        return chatDataRepository.findAll().stream().filter(data -> data.getRoomId().equals(id))
                .toList();
    }
    @GetMapping("/roomData/{id}/newChatData")
    public List<ChatData> getChatDataByChatID(@PathVariable(value = "id")String id,@RequestParam("chatId") String chatId){

        return chatId != null ? getNewChatData(id,chatId)
                : null;
    }

    public List<ChatData> getNewChatData(String roomId ,String lastChatId){

        return chatDataRepository
                .findAll().stream()
                .filter(data -> data.getRoomId().equals(roomId))
                .dropWhile(chatData -> !chatData.getId().equals(lastChatId))
                .skip(1)
                .collect(Collectors.toList());
    }


    @MessageMapping("/chatData/{roomId}/{userId}")
    public ChatData createChatData(@PathVariable(value = "roomId")String roomId,
                                   @PathVariable(value = "userId")String userId,
                                   @RequestBody String message){
        ChatData chatData = new ChatData();
        chatData.setMessage(message);
        chatData.setRoomId(roomId);
        chatData.setSendUserId(userId);
        LocalDateTime now = LocalDateTime.now();
        chatData.setTimestamp(now);
        // simpMessagingTemplate.convertAndSend("/topic/chatData",chatData);
        return chatDataRepository.save(chatData);
    }

    @PutMapping("/chatData/{id}")
    public ResponseEntity<ChatData> updateChatData(
            @PathVariable(value = "id")String id,
            @RequestBody ChatData chatDataDto) {
        Optional<ChatData> chatDataOp = chatDataRepository.findById(id);

        if(chatDataOp.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        ChatData chatData = chatDataOp.get();
        chatData.setMessage(chatDataDto.getMessage());
        chatData.setTimestamp(chatDataDto.getTimestamp());

        final ChatData updateChatData = chatDataRepository.save(chatData);
        return ResponseEntity.ok(updateChatData);
    }

    @DeleteMapping("/chatData/{id}")
    public Map<String ,Boolean> deleteChatData(@PathVariable(value = "id")String id){
        Optional<ChatData> chatData = chatDataRepository.findById(id);
        Map<String,Boolean> response = new HashMap<>();

        if(chatData.isEmpty()){
            response.put("ChatData Not Found",Boolean.FALSE);
        }else {
            chatDataRepository.delete(chatData.get());
            response.put("Deleted",Boolean.TRUE);
        }

        return response;
    }

    public ChatData getLastChatData(String id){
        List<ChatData> chatDataList = getChatDataByRoomId(id);
        if(chatDataList.isEmpty()){
            return null;
        }

        return chatDataList.get(chatDataList.size() - 1);
    }


}
