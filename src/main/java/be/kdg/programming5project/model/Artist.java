package be.kdg.programming5project.model;
import be.kdg.programming5project.model.user.ArtistManager;

import javax.persistence.*;
import javax.persistence.Entity;

import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

@Entity
@Table(name = "artists")
public class Artist extends ProjectEntity {

    @Column(name = "artist_name", nullable = false, length = 50)
    private String name;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "age")
    private int age;

    @Column(name = "hit_song")
    private String hitSong;

    @Column(name = "is_one_person_act")
    private boolean isOnePersonAct;

    @Column(name = "country")
    @Enumerated(EnumType.STRING)
    private Countries country;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

    @ManyToOne
    private ArtistManager artistManager;

    // For Hibernate
    public Artist() {
    }

    // This is for the ones that are added
    public Artist(String name, LocalDate birthDate, String hitSong, boolean isOnePersonAct, Countries country, Image image, ArtistManager artistManager) {
        this.name = name;
        this.birthDate = birthDate;
        this.age = Period.between(birthDate, LocalDate.now()).getYears();
        this.hitSong = hitSong;
        this.isOnePersonAct = isOnePersonAct;
        this.country = country;
        this.image = image;
        this.artistManager = artistManager;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getNationality() {
        return country.getNationality();
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getHitSong() {
        return hitSong;
    }

    public boolean isOnePersonAct() {
        return isOnePersonAct;
    }

    public Countries getCountry() {
        return country;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        this.age = Period.between(birthDate, LocalDate.now()).getYears();
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setHitSong(String hitSong) {
        this.hitSong = hitSong;
    }

    public void setOnePersonAct(boolean onePersonAct) {
        isOnePersonAct = onePersonAct;
    }

    public void setCountry(Countries country) {
        this.country = country;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public ArtistManager getArtistManager() {
        return artistManager;
    }

    public void setArtistManager(ArtistManager artistManager) {
        this.artistManager = artistManager;
    }

    @Override
    public boolean equals(Object o) {
        Artist artist = (Artist) o;
        return (this.getId() == artist.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId());
    }
}
