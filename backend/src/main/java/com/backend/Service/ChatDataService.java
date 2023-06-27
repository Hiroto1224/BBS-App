package com.backend.Service;

import com.backend.Exception.ResourceNotFoundException;
import com.backend.Model.ChatData;
import com.backend.Repository.ChatDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ChatDataService {

    @Autowired
    private ChatDataRepository chatDataRepository;

    public ChatData getChatDataById(String id) {
        return chatDataRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException
                        ("No ChatData found with id: " + id));
    }


    public ChatData updateChatDataById(String id,
                                       ChatData chatDataDto){
        Optional<ChatData> chatDataOp =
                chatDataRepository.findById(id);

        if(chatDataOp.isEmpty()) {
            throw new ResourceNotFoundException("ChatData not found for this id :: " + id);
        }

        ChatData chatData = chatDataOp.get();

        chatData.setMessage(chatDataDto.getMessage());
        chatData.setTimestamp(chatDataDto.getTimestamp());

        return chatDataRepository.save(chatData);
    }

    public void deleteChatDataById(String id){
        ChatData chatData = getChatDataById(id);
        chatDataRepository.delete(chatData);
    }

}
