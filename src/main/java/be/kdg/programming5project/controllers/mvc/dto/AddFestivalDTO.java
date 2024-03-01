package be.kdg.programming5project.controllers.mvc.dto;

import be.kdg.programming5project.model.FestivalType;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;

public class AddFestivalDTO {
    @NotBlank(message = "Name is mandatory")
    @Size(max=40, message = "Name can not exceed 40 Characters")
    private String name;

    @Min(value=1, message = "The Festival must be at least 1 day")
    @Max(value=40, message = "The Festival must be less then 40 days")
    private int lengthDays;
    private FestivalType festivalType;

    @NotBlank(message = "Organizer Name is mandatory")
    @Size(max=30, message = "Name can not exceed 30 Characters")
    private String organizer;

    @NotNull(message = "StartDate is mandatory")
    @Future(message = "StartDate must be in the future")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Min(value=1, message = "The Festival cost must be at least $1")
    @Max(value=100000, message = "The Festival cost can not exceed $100,000")
    private double cost;

    public String getName() {
        return name;
    }

    public int getLengthDays() {
        return lengthDays;
    }

    public FestivalType getFestivalType() {
        return festivalType;
    }

    public String getOrganizer() {
        return organizer;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public double getCost() {
        return cost;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLengthDays(int lengthDays) {
        this.lengthDays = lengthDays;
    }

    public void setFestivalType(FestivalType festivalType) {
        this.festivalType = festivalType;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}
