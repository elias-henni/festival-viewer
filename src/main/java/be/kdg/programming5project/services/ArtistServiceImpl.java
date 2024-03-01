package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.exceptions.DatabaseEmptyException;
import be.kdg.programming5project.model.user.ArtistManager;
import be.kdg.programming5project.repositories.ArtistFestivalRepository;
import be.kdg.programming5project.repositories.ArtistRepository;
import be.kdg.programming5project.repositories.ImageRepository;
import be.kdg.programming5project.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ArtistServiceImpl implements ArtistService {
    private final Logger logger = LoggerFactory.getLogger(ArtistServiceImpl.class);

    private final ArtistRepository artistRepository;
    private final ArtistFestivalRepository artistFestivalRep;

    private final ImageRepository imageRepository;

    @Autowired
    public ArtistServiceImpl(ArtistRepository artistRepository, ArtistFestivalRepository artistFestivalRep, ImageRepository imageRepository) {
        this.artistRepository = artistRepository;
        this.artistFestivalRep = artistFestivalRep;
        this.imageRepository = imageRepository;
    }

    @Override
    public List<Artist> getAll() {
        logger.debug("Artist Service -> getting all Artists");
        if (artistRepository.findAll().isEmpty()) throw new DatabaseEmptyException("artists", "Couldn't find any artists in the Database...");
        return new ArrayList<>(artistRepository.findAll());
    }

    @Override
    public Artist getById(long id) {
        logger.debug("Artist Service -> getting Artist by id");
        return artistRepository.findById(id).orElse(null);
    }

    @Override
    public Artist add(Artist artist) {
        logger.debug("Artist Service -> adding Artist");
        logger.debug("Artist details: " + artist.toString());

        artist.setImage(imageRepository.findImageByFilename("defaultArtist.png"));

        return artistRepository.save(artist);

    }

    @Override
    public Artist update(Artist artist) {
        logger.debug("Artist Service -> updating Artist");
        return artistRepository.save(artist);
    }

    @Override
    public void delete(long id) {
        logger.debug("Artist Service -> deleting Artist");

        artistFestivalRep.deleteAll(artistFestivalRep.findAllRelationsWithArtist(id));
        Artist artist = artistRepository.getReferenceById(id);

        artistRepository.delete(artist);
    }

    @Override
    public List<Artist> searchArtists(String searchValue) {
        return artistRepository.findArtistByName(searchValue);
    }

    @Override
    public List<Artist> getArtistsManagedByArtistManagerId(long id) {
        return artistRepository.findAllArtistsManagedByArtistManagerId(id);
    }
}
