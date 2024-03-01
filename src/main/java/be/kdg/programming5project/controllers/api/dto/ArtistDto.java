package be.kdg.programming5project.controllers.api.dto;

import be.kdg.programming5project.model.Countries;
import be.kdg.programming5project.model.user.ArtistManager;

import java.time.LocalDate;

public class ArtistDto {
    private long id;
    private String name;
    private LocalDate birthDate;
    private int age;
    private String hitSong;
    private boolean isOnePersonAct;
    private Countries country;
    private ArtistManager artistManager;

    public ArtistDto(long id, String name, LocalDate birthDate, int age, String hitSong, boolean isOnePersonAct, Countries country) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.age = age;
        this.hitSong = hitSong;
        this.isOnePersonAct = isOnePersonAct;
        this.country = country;
    }

    public ArtistDto() {
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public int getAge() {
        return age;
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

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
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

    public ArtistManager getArtistManager() {
        return artistManager;
    }

    public void setArtistManager(ArtistManager artistManager) {
        this.artistManager = artistManager;
    }
}
