package be.kdg.programming5project.controllers.mvc.dto;

import be.kdg.programming5project.model.Countries;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AddLocationDTO {
    @NotBlank(message = "Name is mandatory")
    @Size(max=30, message = "Name can not exceed 30 Characters")
    private String venueName;

    @NotBlank(message = "Street is mandatory")
    @Size(max=50, message = "City can not exceed 50 Characters")
    private String street;

    @NotBlank(message = "City is mandatory")
    @Size(max=50, message = "City can not exceed 50 Characters")
    private String city;

    private Countries country;

    public String getVenueName() {
        return venueName;
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

    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }

    public void setCountry(Countries country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}
