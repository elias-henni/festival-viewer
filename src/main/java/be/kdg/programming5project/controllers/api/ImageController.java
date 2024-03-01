package be.kdg.programming5project.controllers.api;

import be.kdg.programming5project.model.Image;
import be.kdg.programming5project.controllers.api.dto.ResponseData;
import be.kdg.programming5project.services.ArtistService;
import be.kdg.programming5project.services.FestivalService;
import be.kdg.programming5project.services.ImageService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Objects;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    private ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload/{entity}/{fileName}/{entityId}")
    public ResponseData uploadImage(@RequestParam("file")MultipartFile file, @PathVariable String entity, @PathVariable String fileName, @PathVariable long entityId) throws Exception {
        Image image = null;
        String downloadURL = "";
        image = imageService.saveImage(file, entity ,fileName, entityId);

        downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .path(String.valueOf(image.getId()))
                .toUriString();
        return new ResponseData(image.getFileName(),
                downloadURL,
                file.getContentType(),
                file.getSize());
    }

    @GetMapping("/download/filename/{filename}")
    public ResponseEntity<Resource> downloadImage(@PathVariable String filename) throws Exception {
        Image image;
        image = imageService.getImageByFilename(filename);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "image; filename=\"" + image.getFileName() + "\"")
                .body(new ByteArrayResource(image.getData()));
    }

    @GetMapping("/download/id/{id}")
    public ResponseEntity<Resource> downloadImagebyId(@PathVariable long id) throws Exception {
        Image image;
        image = imageService.getImageById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "image; filename=\"" + image.getFileName() + "\"")
                .body(new ByteArrayResource(image.getData()));
    }
}
