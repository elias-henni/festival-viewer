package be.kdg.programming5project.repositories;

import be.kdg.programming5project.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query("SELECT l FROM Location l ORDER BY l.id")
    @Override
    List<Location> findAll();
}
