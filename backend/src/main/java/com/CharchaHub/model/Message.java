package com.CharchaHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    @Id
    private String id;

    private String roomId;

    private String username;

    private String avatar;

    private MessageType type;

    private String content;

    private LocalDateTime timestamp;

    @Indexed(expireAfterSeconds = 86400)
    private LocalDateTime expiresAt;

    public enum MessageType {
        TEXT, IMAGE, CODE, JOIN, LEAVE, TYPING
    }

    public Message(String roomId, String username, String avatar, MessageType type, String content) {
        this.roomId = roomId;
        this.username = username;
        this.avatar = avatar;
        this.type = type;
        this.content = content;
        this.timestamp = LocalDateTime.now();
        this.expiresAt = LocalDateTime.now().plusHours(24);
    }
}
