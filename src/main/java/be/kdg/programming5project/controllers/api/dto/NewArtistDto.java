package be.kdg.programming5project.controllers.api.dto;

import be.kdg.programming5project.model.Countries;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;

public class NewArtistDto {
    @NotEmpty(message = "Name is mandatory")
    @Size(max=30, message = "Name can not exceed 30 Characters")
    private String name;
    @NotNull(message = "Birthday is mandatory")
    @Past(message = "Birthday should be in the past")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    @NotEmpty(message = "Hit Song is mandatory")
    @Size(max=30, message = "Name can not exceed 30 Characters")
    private String hitSong;
    private boolean isOnePersonAct;
    @NotNull(message = "Country is mandatory")
    private Countries country;

    public String getName() {
        return name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getHitSong() {
        return hitSong;
    }

    public boolean getIsOnePersonAct() {
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
    }

    public void setHitSong(String hitSong) {
        this.hitSong = hitSong;
    }

    public void setIsOnePersonAct(boolean isOnePersonAct) {
        this.isOnePersonAct = isOnePersonAct;
    }

    public void setCountry(Countries country) {
        this.country = country;
    }
}
