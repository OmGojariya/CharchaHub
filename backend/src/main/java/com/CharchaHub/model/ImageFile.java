package com.CharchaHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageFile {

    @Id
    private String id;

    private String filename;

    private String contentType;

    private byte[] data;

    private long size;

    public ImageFile(String filename, String contentType, byte[] data) {
        this.filename = filename;
        this.contentType = contentType;
        this.data = data;
        this.size = data.length;
    }
}
