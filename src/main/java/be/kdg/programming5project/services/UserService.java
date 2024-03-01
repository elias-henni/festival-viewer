package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.model.Festival;
import be.kdg.programming5project.model.user.ArtistManager;
import be.kdg.programming5project.model.user.FestivalManager;
import be.kdg.programming5project.model.user.User;

import java.util.List;

public interface UserService {
    User findUser(String username);
    User findUserById(long userId);
    void save(User user);
}
