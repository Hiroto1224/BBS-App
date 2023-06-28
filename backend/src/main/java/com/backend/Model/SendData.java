package com.backend.Model;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SendData {

    private String roomId;

    private String roomName;

    private String message;

    private String senderName;

    private LocalDateTime timestamp;

    private Boolean isLastMessage;

    public SendData() {
    }

    public SendData(String roomId, String roomName, String message, String senderName, LocalDateTime timestamp, Boolean isLastMessage) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.message = message;
        this.senderName = senderName;
        this.timestamp = timestamp;
        this.isLastMessage = isLastMessage;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean getLastMessage() {
        return isLastMessage;
    }

    public void setLastMessage(Boolean lastMessage) {
        isLastMessage = lastMessage;
    }
}
