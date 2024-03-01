package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Image;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    Image saveImage(MultipartFile file, String entity, String fileName, long entityId) throws Exception;
    Image getImageByFilename(String fileName) throws Exception;
    Image getImageById(long id) throws Exception;
}
