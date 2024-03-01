package be.kdg.programming5project.model;

import be.kdg.programming5project.model.user.FestivalManager;

import javax.persistence.*;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name="festivals")
public class Festival extends ProjectEntity {
    @Column(name = "festival_name")
    private String name;

    @Column(name = "length_in_days")
    private int lengthDays;

    @Column(name = "festival_type")
    @Enumerated(EnumType.STRING)
    private FestivalType type;

    @Column(name = "organizer")
    private String organizer;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "ticket_cost")
    private double cost;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name="location_id")
    private Location location;

    @ManyToOne
    private FestivalManager festivalManager;

    public Festival() {

    }

    public Festival(String name, int lengthDays, FestivalType type, String organizer, LocalDate startDate, double cost, Image image,  FestivalManager festivalManager) {
        this.name = name;
        this.lengthDays = lengthDays;
        this.type = type;
        this.organizer = organizer;
        this.startDate = startDate;
        this.cost = cost;
        this.image = image;
        this.festivalManager = festivalManager;
    }

    public double getCost() {
        return cost;
    }

    public String getName() {
        return name;
    }

    public int getLength() {
        return lengthDays;
    }

    public FestivalType getType() {
        return type;
    }

    public String getOrganizer() {
        return organizer;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void addLocation(Location location) {
        this.location = location;
    }

    public final static DateTimeFormatter DATE_FORMATTER = DateTimeFormatter
            .ofPattern("dd-MM-yyyy");

    public int getLengthDays() {
        return lengthDays;
    }

    public Image getImage() {
        return image;
    }

    public Location getLocation() {
        return location;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public FestivalManager getFestivalManager() {
        return festivalManager;
    }

    public void setFestivalManager(FestivalManager festivalManager) {
        this.festivalManager = festivalManager;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLengthDays(int lengthDays) {
        this.lengthDays = lengthDays;
    }

    public void setType(FestivalType type) {
        this.type = type;
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

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return String.format(
                """
                        ----- Festival -----
                        Name: %s
                        Date: %s
                        Length(days): %s
                        Type: %s
                        Organizer: %s
                        Cost: %s
                        """, name, DATE_FORMATTER.format(startDate), lengthDays, type.getString(), organizer, cost);
    }
}
