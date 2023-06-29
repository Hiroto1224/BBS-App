package com.backend.Contrller;


import com.azure.core.exception.ResourceNotFoundException;
import com.backend.Model.ChatData;
import com.backend.Repository.ChatDataRepository;
import com.backend.Service.ChatDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class ChatController {
    private final SimpMessagingTemplate template;
    private final ChatDataRepository chatDataRepository;
    private final ChatDataService chatDataService;

    @Autowired
    public ChatController(SimpMessagingTemplate template, ChatDataRepository chatDataRepository, ChatDataService chatDataService) {
        this.template = template;
        this.chatDataRepository = chatDataRepository;
        this.chatDataService = chatDataService;
    }

    /**
     * Returns a list of all ChatData objects in the chatDataRepository.
     *
     * @return A ResponseEntity object containing a list of ChatData objects if chatDataList is not empty,
     *         otherwise a no content response.
     */
    @GetMapping("/chatData")
    public ResponseEntity<List<ChatData>> getChatData() {
        List<ChatData> chatDataList = chatDataRepository.findAll();

        if(chatDataList.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(chatDataList);
    }

    /**
     * Returns a ResponseEntity object containing a ChatData object with the specified ID.
     *
     * @param id The ID of the ChatData object to return.
     *
     * @return A ResponseEntity object containing the ChatData object with the specified ID, if it exists,
     *         otherwise a not found response.
     */
    @GetMapping("/chatData/{id}")
    public ResponseEntity<ChatData> getChatDataById(@PathVariable(value = "id")String id){
        return ResponseEntity.ok(chatDataService.getChatDataById(id));
    }

    /**
     * Returns a list of ChatData objects associated with a room specified by the ID.
     *
     * @param id The ID of the room to retrieve ChatData for.
     *
     * @return A list of ChatData objects associated with the specified room ID.
     */
    @GetMapping("/roomData/{id}/ChatData")
    public ResponseEntity<List<ChatData>> getChatDataByRoomId(@PathVariable(value = "id")String id){
        List<ChatData> chatDataList = chatDataRepository.findByRoomId(id);
        return !chatDataList.isEmpty()
                ? ResponseEntity.ok(chatDataList)
                : ResponseEntity.notFound().build();
    }

    /**
     * Returns a list of new ChatData objects for a given last chatId and room id.
     *
     * @param roomId The id of the room where the chat is taking place.
     * @param lastChatId The id of the last chat which was retrieved previously.
     *
     * @return A list of ChatData objects that were added to the chat after the chat with the lastChatId.
     *         If no new data is available, an empty list is returned.
     */
    public List<ChatData> getNewChatData(String roomId ,String lastChatId){
        List<ChatData> chatDataList = chatDataRepository.findByRoomId(roomId);

        return chatDataList.stream()
                .dropWhile(chatData -> !chatData.getId().equals(lastChatId))
                .skip(1)
                .collect(Collectors.toList());
    }


    /**
     * Creates a new ChatData object for a given message and saves it to the database.
     *
     * @param chatData The ChatData object containing the message and other details to be saved.
     *
     * @return The ChatData object that was saved to the database.
     */
    @PostMapping("/chatData/sendMessage")
    public ResponseEntity<ChatData> createChatData(@RequestBody ChatData chatData){
        LocalDateTime now = LocalDateTime.now();
        chatData.setTimestamp(now);
        ChatData savedChatData = saveChatData(chatData);
        this.template.convertAndSend("/api/v1/chatData/sendMessage","send server Message");
        return ResponseEntity.ok(savedChatData);

    }

    /**
     * Updates an existing ChatData object with a new message and saves it to the database.
     *
     * @param id The id of the ChatData object to be updated.
     * @param chatDataDto The ChatData object containing the updated message and other details.
     *
     * @return ResponseEntity object containing the updated ChatData object if successful, else returns 404 error.
     *
     * @throws ResourceNotFoundException if the provided id does not match any records in the database.
     */
    @PutMapping("/chatData/{id}")
    public ResponseEntity<ChatData> updateChatData(
            @PathVariable(value = "id")String id,
            @RequestBody ChatData chatDataDto) {
        try {
            ChatData updatedChatData = chatDataService.updateChatDataById(id, chatDataDto);
            return ResponseEntity.ok(updatedChatData);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Deletes the ChatData object with the given id from the database.
     *
     * @param id The id of the ChatData object to be deleted.
     *
     * @return A map containing a "Deleted" key with a boolean value of true if the deletion is successful.
     *
     * @throws ResourceNotFoundException if the provided id does not match any records in the database.
     */
    @DeleteMapping("/chatData/{id}")
    public Map<String ,Boolean> deleteChatData(@PathVariable(value = "id")String id){
        Map<String,Boolean> response = new HashMap<>();
        chatDataService.deleteChatDataById(id);
        response.put("Deleted",Boolean.TRUE);
        return response;
    }


    /**
     * Returns the last ChatData object in the list of ChatData objects associated with the given room id.
     *
     * @param id The id of the room to get the last ChatData object for.
     *
     * @return An Optional object containing the last ChatData object in the list of ChatData objects
     *         associated with the given room id, or an empty Optional if the list is empty.
     *
     * @throws ResourceNotFoundException if the provided id does not match any records in the database.
     */
    public Optional<ChatData> getLastChatData(String id){
        List<ChatData> chatDataList = getChatDataByRoomId(id).getBody();

        if (chatDataList != null && !chatDataList.isEmpty()) {
            return Optional.of(chatDataList.get(chatDataList.size() - 1));
        }

        return Optional.empty();
    }

    /**
     * Saves the given chatData object to the chatDataRepository.
     *
     * @param chatData The ChatData object to be saved.
     * @return The saved ChatData object.
     */
    private ChatData saveChatData(ChatData chatData) {
        return chatDataRepository.save(chatData);
    }
}
