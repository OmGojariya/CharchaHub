package com.CharchaHub.dto;

import com.CharchaHub.model.Message.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private String roomId;
    private String username;
    private String avatar;
    private MessageType type;
    private String content;
}
