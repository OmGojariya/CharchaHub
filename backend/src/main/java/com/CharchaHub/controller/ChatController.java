package com.CharchaHub.controller;

import com.CharchaHub.dto.ChatMessage;
import com.CharchaHub.model.Message;
import com.CharchaHub.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final MessageService messageService;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        Message savedMessage = messageService.saveMessage(chatMessage);
        messagingTemplate.convertAndSend("/topic/room/" + chatMessage.getRoomId(), savedMessage);
    }

    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSend("/topic/room/" + chatMessage.getRoomId(), chatMessage);
    }

    @MessageMapping("/chat.typing")
    public void handleTyping(@Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSend("/topic/room/" + chatMessage.getRoomId(), chatMessage);
    }

    @MessageMapping("/chat.leaveRoom")
    public void leaveRoom(@Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSend("/topic/room/" + chatMessage.getRoomId(), chatMessage);
    }
}
