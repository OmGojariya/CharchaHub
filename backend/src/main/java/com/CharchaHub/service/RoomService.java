package com.CharchaHub.service;

import com.CharchaHub.dto.CreateRoomRequest;
import com.CharchaHub.dto.JoinRoomRequest;
import com.CharchaHub.model.Room;
import com.CharchaHub.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public Room createRoom(CreateRoomRequest request) {
        if (roomRepository.existsByRoomKey(request.getRoomKey())) {
            throw new IllegalArgumentException("Room key already exists");
        }

        Room room = new Room(request.getRoomName(), request.getRoomKey());
        return roomRepository.save(room);
    }

    public Room joinRoom(String roomId, JoinRoomRequest request) {
        Optional<Room> roomOpt = roomRepository.findByRoomId(roomId);
        if (roomOpt.isEmpty()) {
            throw new IllegalArgumentException("Room not found");
        }

        Room room = roomOpt.get();
        if (!room.getRoomKey().equals(request.getRoomKey())) {
            throw new IllegalArgumentException("Invalid room key");
        }

        return room;
    }

    public Room findRoomByKey(String roomKey) {
        Optional<Room> roomOpt = roomRepository.findByRoomKey(roomKey);
        if (roomOpt.isEmpty()) {
            throw new IllegalArgumentException("Room not found");
        }
        return roomOpt.get();
    }

    public Optional<Room> getRoomById(String roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    public void deleteRoom(String roomId) {
        Optional<Room> roomOpt = roomRepository.findByRoomId(roomId);
        if (roomOpt.isPresent()) {
            roomRepository.delete(roomOpt.get());
        }
    }
}
