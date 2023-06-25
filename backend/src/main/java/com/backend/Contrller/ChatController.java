package com.backend.Contrller;


import com.backend.Model.ChatData;
import com.backend.Repository.ChatDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class ChatController {
    @Autowired
    private ChatDataRepository chatDataRepository;

    @GetMapping("/chatData")
    public List<ChatData> getChatData() {
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
    @GetMapping("/roomData/{id}/ChatData/{lastChatId}")
    public List<ChatData> getChatDataByChatID(@PathVariable(value = "id")String id,@PathVariable(value = "lastChatId")String chatId){

        return !chatId.isEmpty() ? getNewChatData(id,chatId) : chatDataRepository.findAll().stream().filter(data -> data.getRoomId().equals(id)).toList();
    }

    public List<ChatData> getNewChatData(String roomId ,String lastChatId){

        return chatDataRepository
                .findAll().stream()
                .filter(data -> data.getRoomId().equals(roomId))
                .dropWhile(chatData -> !chatData.getId().equals(lastChatId))
                .skip(1)
                .collect(Collectors.toList());
    }

    @PostMapping("/chatData")
    public ChatData createChatData(@RequestBody ChatData chatData){
        LocalDateTime now = LocalDateTime.now();
        chatData.setTimestamp(now);
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
