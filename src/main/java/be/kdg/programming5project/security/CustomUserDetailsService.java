package be.kdg.programming5project.security;

import be.kdg.programming5project.model.user.Administrator;
import be.kdg.programming5project.model.user.ArtistManager;
import be.kdg.programming5project.model.user.FestivalManager;
import be.kdg.programming5project.model.user.User;
import be.kdg.programming5project.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final UserService userService;

    @Autowired
    public CustomUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUser(username);
        if (user != null) {
            GrantedAuthority role = new SimpleGrantedAuthority("invalid");
            if (user instanceof ArtistManager){
                role = new SimpleGrantedAuthority("ROLE_ARTIST_MANAGER");
                log.debug("ARTIST_MANAGER user logged in");
            } else if (user instanceof FestivalManager) {
                role = new SimpleGrantedAuthority("ROLE_FESTIVAL_MANAGER");
                log.debug("FESTIVAL_MANAGER user logged in");
            } else if (user instanceof Administrator) {
                role = new SimpleGrantedAuthority("ROLE_ADMIN");
                log.debug("ADMIN user logged in");
            }
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(role);
            return new CustomUserDetails((int) user.getId(), user.getUsername(), user.getPassword(), authorities);
        } else {
            throw new UsernameNotFoundException("User '" + username + "' not found.");
        }
    }

}
