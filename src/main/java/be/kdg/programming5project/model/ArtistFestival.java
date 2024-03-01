package be.kdg.programming5project.model;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "artist_id", "festival_id" }) })
public class ArtistFestival extends ProjectEntity {
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "festival_id")
    private Festival festival;

    // For Hibernate
    protected ArtistFestival() {
    }

    public ArtistFestival(Artist artist, Festival festival) {
        this.artist = artist;
        this.festival = festival;
    }

    public Artist getArtist() {
        return artist;
    }

    public Festival getFestival() {
        return festival;
    }
}
