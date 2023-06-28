package com.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collation = "chatData")
public class ChatData {
    @Id
    private String id;
    private String message;
    private LocalDateTime timestamp;
    private String sendUserName;
    private String roomId;



    public ChatData() {
    }

    public ChatData(String id, String message, LocalDateTime timestamp,String sendUserId,String roomId) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.sendUserName = sendUserId;
        this.roomId = roomId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getSendUserName() {
        return sendUserName;
    }

    public void setSendUserName(String sendUserName) {
        this.sendUserName = sendUserName;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
