package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.model.Festival;
import be.kdg.programming5project.model.user.ArtistManager;
import be.kdg.programming5project.model.user.FestivalManager;
import be.kdg.programming5project.model.user.User;
import be.kdg.programming5project.repositories.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUser(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User findUserById(long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }
}
