package com.CharchaHub.service;

import com.CharchaHub.model.ImageFile;
import com.CharchaHub.repository.ImageFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageFileRepository imageFileRepository;

    public ImageFile saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }

        ImageFile imageFile = new ImageFile(
                file.getOriginalFilename(),
                contentType,
                file.getBytes());

        return imageFileRepository.save(imageFile);
    }

    public Optional<ImageFile> getImage(String id) {
        return imageFileRepository.findById(id);
    }
}
