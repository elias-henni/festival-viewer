package be.kdg.programming5project.services;

import be.kdg.programming5project.model.Location;
import be.kdg.programming5project.exceptions.DatabaseEmptyException;
import be.kdg.programming5project.repositories.LocationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {
    private Logger logger = LoggerFactory.getLogger(LocationServiceImpl.class);

    private final LocationRepository locationRepository;

    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public List<Location> getAll() {
        logger.debug("Location Service -> getting all Locations");
        if (locationRepository.findAll().isEmpty()) throw new DatabaseEmptyException("locations", "Couldn't find any locations in the Database...");
        return new ArrayList<>(locationRepository.findAll());
    }

    @Override
    public Location getById(long id) {
        logger.debug("Location Service -> getting Location by id");
        return locationRepository.findById(id).orElse(null);
    }

    @Override
    public Location add(Location location) {
        logger.debug("Location Service -> adding Location");
        return locationRepository.save(location);
    }

    @Override
    public Location update(Location location) {
        logger.debug("Artist Service -> updating Artist");
        return locationRepository.save(location);
    }

    @Override
    public void delete(long id) {
        logger.debug("Location Service -> deleting Location");
        locationRepository.deleteById(id);
    }
}
