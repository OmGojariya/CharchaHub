package com.CharchaHub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomRequest {
    @NotBlank(message = "Room name is required")
    @Size(min = 3, max = 50, message = "Room name must be between 3 and 50 characters")
    private String roomName;

    @NotBlank(message = "Room key is required")
    @Size(min = 4, max = 20, message = "Room key must be between 4 and 20 characters")
    private String roomKey;
}
