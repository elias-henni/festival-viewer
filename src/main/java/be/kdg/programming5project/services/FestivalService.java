package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.model.Festival;

import java.util.List;

public interface FestivalService extends EntityService<Festival> {
    List<Artist> getArtistsGoingToFestival(long festivalId);
    List<Festival> getFestivalsManagedByFestivalManagerId(long id);

}
