package be.kdg.programming5project.model.user;

import be.kdg.programming5project.model.Festival;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class FestivalManager extends User {
    public FestivalManager(String username, String secret) {
        super(username, secret);

    }
    public FestivalManager() {
        super();
    }

}
