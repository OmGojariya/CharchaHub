package com.CharchaHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    private String id;

    private String roomId;

    private String roomName;

    private String roomKey;

    private LocalDateTime createdAt;

    @Indexed(expireAfterSeconds = 86400)
    private LocalDateTime expiresAt;

    public Room(String roomName, String roomKey) {
        this.roomId = UUID.randomUUID().toString();
        this.roomName = roomName;
        this.roomKey = roomKey;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = LocalDateTime.now().plusHours(24);
    }
}
