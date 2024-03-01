package be.kdg.programming5project.controllers.mvc;

import be.kdg.programming5project.model.Countries;
import be.kdg.programming5project.model.Location;
import be.kdg.programming5project.exceptions.DatabaseEmptyException;
import be.kdg.programming5project.controllers.mvc.dto.AddLocationDTO;
import be.kdg.programming5project.services.LocationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Objects;

@Controller
@RequestMapping("/locations")
public class LocationController {
    private Logger logger = LoggerFactory.getLogger(LocationController.class);
    private LocationService locationService;

    public LocationController(LocationService locationService) {
        logger.debug("Creating LocationController...");
        this.locationService = locationService;
    }

    @GetMapping
    public ModelAndView showAllLocations() {
        logger.debug("Running the showAllLocations method...");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("locations");
        mav.addObject("locations", locationService.getAll());
        return mav;
    }

    @GetMapping("/add")
    public ModelAndView showAddLocation() {
        logger.debug("Showing location form");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("add_location");
        // It needs to give a list of nationalities
        mav.addObject("location", new AddLocationDTO());
        mav.addObject("countries", Countries.values());
        return mav;
    }

    @GetMapping("/detail/{locationId}")
    public ModelAndView showLocationDetail(@PathVariable("locationId") long locationId) {
        logger.debug("Showing location detail");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("detail_location");
        Location location = locationService.getById(locationId);
        mav.addObject("location", location);
        return mav;
    }

    @GetMapping("/detail/{locationId}/delete")
    public ModelAndView deleteLocation(@PathVariable long locationId){
        ModelAndView mav = new ModelAndView();
        mav.setViewName("redirect:/locations");
        locationService.delete(locationId);
        return mav;
    }

    @PostMapping("/add")
    public ModelAndView processAddLocation (@Valid @ModelAttribute("location") AddLocationDTO addLocationDTO, BindingResult errors) {
        ModelAndView mav = new ModelAndView();
        if (errors.hasErrors()) {
            errors.getAllErrors().forEach(error->{
                if (!Objects.equals(error.getCode(), "typeMismatch")) logger.error(error.toString());
            });
            //show the form again
            mav.setViewName("add_location");
            mav.addObject("countries", Countries.values());
            return mav;
        }
        logger.debug("Processing adding a location");
        mav.setViewName("redirect:/locations");
        Location location = new Location(addLocationDTO.getVenueName(), addLocationDTO.getStreet(), addLocationDTO.getCity(),
                addLocationDTO.getCountry());
        locationService.add(location);
        return mav;
    }

    @ExceptionHandler(DatabaseEmptyException.class)
    public ModelAndView handleError(HttpServletRequest req, DatabaseEmptyException exception) {
        logger.error(exception.getMessage());
        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", exception);
        mav.setViewName("db_empty");
        return mav;
    }
}
