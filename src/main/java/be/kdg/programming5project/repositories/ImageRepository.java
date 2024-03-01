package be.kdg.programming5project.repositories;

import be.kdg.programming5project.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query("SELECT i FROM Image i WHERE i.fileName = ?1")
    Image findImageByFilename(String filename);

    @Query("SELECT i FROM Image i WHERE i.id = ?1")
    Image findImageById(long id);
}
