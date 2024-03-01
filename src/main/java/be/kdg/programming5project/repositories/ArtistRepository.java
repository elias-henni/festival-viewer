package be.kdg.programming5project.repositories;

import be.kdg.programming5project.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    @Query("SELECT a FROM Artist a ORDER BY a.id")
    @Override
    List<Artist> findAll();

    @Query("SELECT a FROM Artist a WHERE a.artistManager.id = ?1")
    List<Artist> findAllArtistsManagedByArtistManagerId(long id);

    @Query("select artist from Artist artist where upper(artist.name) like upper(concat('%', :searchValue, '%'))")
    List<Artist> findArtistByName(@Param("searchValue") String searchValue);
}
