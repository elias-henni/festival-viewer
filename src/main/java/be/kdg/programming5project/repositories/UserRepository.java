package be.kdg.programming5project.repositories;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.model.Festival;
import be.kdg.programming5project.model.user.ArtistManager;
import be.kdg.programming5project.model.user.FestivalManager;
import be.kdg.programming5project.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
