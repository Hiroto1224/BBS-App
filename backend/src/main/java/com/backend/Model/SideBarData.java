package com.backend.Model;

public class SideBarData {

    String roomId;

    String roomName;

    String message;

    String senderName;

    public SideBarData() {
    }

    public SideBarData(String roomId, String roomName, String message, String senderName) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.message = message;
        this.senderName = senderName;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

}
