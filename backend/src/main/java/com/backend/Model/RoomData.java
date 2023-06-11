package com.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collation = "roomData")
public class RoomData {
    @Id
    private String id;
    private String name;

    private List<String> userIds;

    public RoomData() {
    }

    public RoomData(String id, String name, List<String> userIds) {
        this.id = id;
        this.name = name;
        this.userIds = userIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<String> userIds) {
        this.userIds = userIds;
    }
}
