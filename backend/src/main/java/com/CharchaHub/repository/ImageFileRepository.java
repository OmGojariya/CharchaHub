package com.CharchaHub.repository;

import com.CharchaHub.model.ImageFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageFileRepository extends MongoRepository<ImageFile, String> {
}
