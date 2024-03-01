package be.kdg.programming5project.model.user;

import be.kdg.programming5project.model.Artist;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ArtistManager extends User {
    public ArtistManager(String username, String secret) {
        super(username, secret);
    }

    public ArtistManager() {
        super();

    }
}
