package be.kdg.programming5project.repositories;

import be.kdg.programming5project.model.ArtistFestival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface ArtistFestivalRepository extends JpaRepository<ArtistFestival, Long> {
    @Query("SELECT a FROM ArtistFestival a WHERE a.artist.id = ?1")
    List<ArtistFestival> findAllRelationsWithArtist(Long artistId);

    @Query("SELECT f FROM ArtistFestival f WHERE f.festival.id = ?1")
    List<ArtistFestival> findAllRelationsWithFestival(Long festivalId);
}
