package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Image;
import be.kdg.programming5project.repositories.ArtistRepository;
import be.kdg.programming5project.repositories.FestivalRepository;
import be.kdg.programming5project.repositories.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ArtistRepository artistRepository;
    private final FestivalRepository festivalRepository;

    public ImageServiceImpl(ImageRepository imageRepository, ArtistRepository artistRepository, FestivalRepository festivalRepository) {
        this.imageRepository = imageRepository;
        this.artistRepository = artistRepository;
        this.festivalRepository = festivalRepository;
    }

    @Override
    public Image saveImage(MultipartFile file, String entity, String fileName, long entityId) throws Exception {
        try {
            Image image = new Image(fileName, file.getContentType(), file.getBytes());
            try {
                imageRepository.save(image);
            } catch (Exception e) {
                System.out.println(e);
            }


            if (entity.equals("artist")) {
                System.out.println("Image added to artist");
                artistRepository.getReferenceById(entityId).setImage(image);
            } else if (entity.equals("festival")) {
                System.out.println("Image added to festival");
                festivalRepository.getReferenceById(entityId).setImage(image);
            }

            imageRepository.save(image);

            return image;

        } catch (Exception e) {
            throw new Exception("Could not save File:" + fileName);
        }

    }


    @Override
    public Image getImageByFilename(String fileName) throws Exception {
        if (imageRepository.findImageByFilename(fileName) == null) {
            throw new Exception("File not found with name " + fileName);
        }
        return imageRepository.findImageByFilename(fileName);
    }

    @Override
    public Image getImageById(long id) throws Exception {
        if (imageRepository.findImageById(id) == null) {
            throw new Exception("File not found with name " + id);
        }
        return imageRepository.findImageById(id);
    }
}
