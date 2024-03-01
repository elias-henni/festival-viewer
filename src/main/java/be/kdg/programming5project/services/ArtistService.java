package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Artist;

import java.util.List;

public interface ArtistService extends EntityService<Artist>{

    List<Artist> searchArtists(String searchValue);

    List<Artist> getArtistsManagedByArtistManagerId(long id);
}
