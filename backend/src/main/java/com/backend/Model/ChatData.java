package com.backend.Model;

import jdk.jfr.Timestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Document(collation = "chatData")
public class ChatData {
    @Id
    private String id;
    private String message;
    private LocalDateTime timestamp;
    private String sendUserId;
    private String roomId;



    public ChatData() {
    }

    public ChatData(String id, String message, LocalDateTime timestamp,String sendUserId,String roomId) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.sendUserId = sendUserId;
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

    public String getSendUserId() {
        return sendUserId;
    }

    public void setSendUserId(String sendUserId) {
        this.sendUserId = sendUserId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
