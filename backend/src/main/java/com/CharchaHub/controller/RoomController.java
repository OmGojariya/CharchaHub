package com.CharchaHub.controller;

import com.CharchaHub.dto.ApiResponse;
import com.CharchaHub.dto.CreateRoomRequest;
import com.CharchaHub.dto.JoinRoomRequest;
import com.CharchaHub.model.Room;
import com.CharchaHub.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/rooms")
    public ResponseEntity<ApiResponse<String>> getRooms() {
        return ResponseEntity
                .ok(ApiResponse.success("CharchaHub API is running", "Available endpoints: /room/create, /room/join"));
    }

    @GetMapping("/test")
    public ResponseEntity<ApiResponse<String>> test() {
        return ResponseEntity.ok(ApiResponse.success("Room controller is working", "Test successful"));
    }

    @GetMapping("/room/find/{roomKey}")
    public ResponseEntity<ApiResponse<Room>> findRoomByKey(@PathVariable String roomKey) {
        try {
            Room room = roomService.findRoomByKey(roomKey);
            return ResponseEntity.ok(ApiResponse.success("Room found", room));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/room/create")
    public ResponseEntity<ApiResponse<Room>> createRoom(@Valid @RequestBody CreateRoomRequest request) {
        try {
            System.out
                    .println("🔧 Creating room with name: " + request.getRoomName() + ", key: " + request.getRoomKey());
            Room room = roomService.createRoom(request);
            System.out.println("✅ Room created successfully: " + room.getRoomId());
            return ResponseEntity.ok(ApiResponse.success("Room created successfully", room));
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Room creation failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            System.out.println("💥 Unexpected error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An unexpected error occurred: " + e.getMessage()));
        }
    }

    @PostMapping("/room/join/{roomId}")
    public ResponseEntity<ApiResponse<Room>> joinRoom(@PathVariable String roomId,
            @Valid @RequestBody JoinRoomRequest request) {
        try {
            Room room = roomService.joinRoom(roomId, request);
            return ResponseEntity.ok(ApiResponse.success("Joined room successfully", room));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
