package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.model.ArtistFestival;
import be.kdg.programming5project.model.Festival;
import be.kdg.programming5project.exceptions.DatabaseEmptyException;
import be.kdg.programming5project.model.user.FestivalManager;
import be.kdg.programming5project.repositories.ArtistFestivalRepository;
import be.kdg.programming5project.repositories.FestivalRepository;
import be.kdg.programming5project.repositories.ImageRepository;
import be.kdg.programming5project.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FestivalServiceImpl implements FestivalService {
    private final Logger logger = LoggerFactory.getLogger(FestivalServiceImpl.class);
    private final FestivalRepository festivalRepository;
    private final ArtistFestivalRepository artistFestivalRep;

    private final ImageRepository imageRepository;

    @Autowired
    public FestivalServiceImpl(FestivalRepository festivalRepository, ArtistFestivalRepository artistFestivalRep, ImageRepository imageRepository ) {
        this.festivalRepository = festivalRepository;
        this.artistFestivalRep = artistFestivalRep;
        this.imageRepository = imageRepository;
    }

    @Override
    public List<Festival> getAll() {
        logger.debug("Festival Service -> getting all Festivals");
        if (festivalRepository.findAll().isEmpty()) throw new DatabaseEmptyException("festivals", "Couldn't find any festivals in the Database...");
        return new ArrayList<>(festivalRepository.findAll());
    }

    @Override
    public Festival getById(long id) {
        logger.debug("Festival Service -> getting Festival by id");
        return festivalRepository.findById(id).orElse(null);
    }

    @Override
    public Festival add(Festival festival) {
        logger.debug("Festival Service -> adding Festival");

        festival.setImage(imageRepository.findImageByFilename("defaultFestival.png"));

        return festivalRepository.save(festival);
    }

    @Override
    public Festival update(Festival festival) {
        logger.debug("Festival Service -> updating Artist");
        return festivalRepository.save(festival);
    }

    @Override
    public void delete(long id) {
        logger.debug("Festival Service -> deleting Festival");
        artistFestivalRep.deleteAll(artistFestivalRep.findAllRelationsWithFestival(id));
        Festival festival = festivalRepository.getReferenceById(id);

        festivalRepository.delete(festival);
    }

    @Override
    public List<Artist> getArtistsGoingToFestival(long festivalId) {
        return artistFestivalRep.findAllRelationsWithFestival(festivalId).stream()
                .map(ArtistFestival::getArtist)
                .collect(Collectors.toList());
    }

    @Override
    public List<Festival> getFestivalsManagedByFestivalManagerId(long id) {
        return festivalRepository.findAllFestivalsManagedByFestivalManagerId(id);
    }
}
