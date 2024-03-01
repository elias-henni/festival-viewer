package be.kdg.programming5project.model;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="locations")
public class Location extends ProjectEntity {

    @Column(name = "venue_name")
    private String venueName;

    @Column(name = "street")
    private String street;

    @Column(name = "city")
    private String city;

    @Enumerated(EnumType.STRING)
    private Countries country;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Festival> festivals;

    protected Location() {

    }

    public Location(String venueName, String street, String city, Countries country) {
        this.country = country;
        this.city = city;
        this.street = street;
        this.venueName = venueName;
        this.festivals = new ArrayList<>();
    }

    public Countries getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public String getStreet() {
        return street;
    }

    public String getVenueName() {
        return venueName;
    }

    public void addFestival(Festival festival) {
        festivals.add(festival);
    }

    @Override
    public String toString() {
        return String.format(
                """
                        --- Location ---
                         Venue: %s
                         Street: %s
                         City: %s
                         Country: %s

                        """, venueName, street, city, country);
    }
}
