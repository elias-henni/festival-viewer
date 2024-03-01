package be.kdg.programming5project.controllers.api.dto;

import be.kdg.programming5project.model.FestivalType;
import be.kdg.programming5project.model.user.FestivalManager;

import java.time.LocalDate;

public class FestivalDto {

    private long id;
    private String name;

    private int lengthDays;

    private FestivalType festivalType;

    private String organizer;

    private LocalDate startDate;

    private double cost;

    private FestivalManager festivalManager;

    public FestivalDto(long id, String name, int lengthDays, FestivalType festivalType, String organizer, LocalDate startDate, double cost, FestivalManager festivalManager) {
        this.id = id;
        this.name = name;
        this.lengthDays = lengthDays;
        this.festivalType = festivalType;
        this.organizer = organizer;
        this.startDate = startDate;
        this.cost = cost;
        this.festivalManager = festivalManager;
    }

    public FestivalDto() {
    }

    public String getName() {
        return name;
    }

    public int getLengthDays() {
        return lengthDays;
    }

    public FestivalType getfestivalType() {
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

    public FestivalManager getFestivalManager() {
        return festivalManager;
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

    public void setFestivalManager(FestivalManager festivalManager) {
        this.festivalManager = festivalManager;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
