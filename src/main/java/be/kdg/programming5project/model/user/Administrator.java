package be.kdg.programming5project.model.user;

import javax.persistence.Entity;

@Entity
public class Administrator extends User {

    public Administrator(String username, String secret) {
        super(username, secret);
    }

    public Administrator() {
        super();
    }

}
