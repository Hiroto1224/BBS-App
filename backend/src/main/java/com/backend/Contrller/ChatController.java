package com.backend.Contrller;


import com.backend.Model.ChatData;
import com.backend.Repository.ChatDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;

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

    @PostMapping("/chatData")
    public ChatData createChatData(@RequestBody ChatData chatData){

        
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
        chatData.setId(chatDataDto.getId());

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


}
