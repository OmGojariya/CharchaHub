package com.CharchaHub.repository;

import com.CharchaHub.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    Optional<Room> findByRoomId(String roomId);

    Optional<Room> findByRoomKey(String roomKey);

    boolean existsByRoomKey(String roomKey);
}
