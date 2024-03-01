package be.kdg.programming5project.controllers.api.dto;

import be.kdg.programming5project.model.FestivalType;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import javax.validation.constraints.*;

public class NewFestivalDto {
    @NotEmpty(message = "Name is mandatory")
    @Size(max=30, message = "Name can not exceed 30 Characters")
    private String name;

    @NotNull(message = "Start Date is mandatory")
    @Future(message = "Start Date should be in the future")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Min(value = 1, message = "Length of days has to be at least 1")
    private int lengthDays;

    @NotNull(message = "Festival Type is mandatory")
    private FestivalType festivalType;

    @NotEmpty(message = "Organizer is mandatory")
    @Size(max=30, message = "Name can not exceed 30 Characters")
    private String organizer;

    @DecimalMin(value = "1.0", message = "Cost can't be 0")
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
