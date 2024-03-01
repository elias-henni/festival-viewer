package be.kdg.programming5project.repositories;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.model.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {
    @Query("SELECT f FROM Festival f ORDER BY f.id")
    @Override
    List<Festival> findAll();

    @Query("SELECT f FROM Festival f WHERE f.festivalManager.id = ?1")
    List<Festival> findAllFestivalsManagedByFestivalManagerId(long id);
}
