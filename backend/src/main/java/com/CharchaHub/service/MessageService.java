package com.CharchaHub.service;

import com.CharchaHub.dto.ChatMessage;
import com.CharchaHub.model.Message;
import com.CharchaHub.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message saveMessage(ChatMessage chatMessage) {
        Message message = new Message(
                chatMessage.getRoomId(),
                chatMessage.getUsername(),
                chatMessage.getAvatar(),
                chatMessage.getType(),
                chatMessage.getContent());
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByRoomId(String roomId) {
        return messageRepository.findByRoomIdOrderByTimestampAsc(roomId);
    }
}
