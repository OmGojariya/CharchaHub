package com.CharchaHub.controller;

import com.CharchaHub.dto.ApiResponse;
import com.CharchaHub.model.ImageFile;
import com.CharchaHub.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/image")
    public ResponseEntity<ApiResponse<String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            ImageFile imageFile = imageService.saveImage(file);
            return ResponseEntity.ok(ApiResponse.success("Image uploaded successfully", imageFile.getId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to upload image"));
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        Optional<ImageFile> imageFile = imageService.getImage(id);

        if (imageFile.isPresent()) {
            ImageFile image = imageFile.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(image.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + image.getFilename() + "\"")
                    .body(image.getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
