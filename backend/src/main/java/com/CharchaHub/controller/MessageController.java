package com.CharchaHub.controller;

import com.CharchaHub.dto.ApiResponse;
import com.CharchaHub.model.Message;
import com.CharchaHub.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://charcha-hub-psi.vercel.app", "https://*.vercel.app", "http://localhost:3000"})
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<ApiResponse<List<Message>>> getMessages(@PathVariable String roomId) {
        List<Message> messages = messageService.getMessagesByRoomId(roomId);
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved successfully", messages));
    }
}
