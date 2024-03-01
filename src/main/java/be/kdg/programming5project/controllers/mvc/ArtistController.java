package be.kdg.programming5project.controllers.mvc;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.model.Countries;
import be.kdg.programming5project.exceptions.DatabaseEmptyException;
import be.kdg.programming5project.controllers.mvc.dto.AddArtistDTO;
import be.kdg.programming5project.services.ArtistService;
import be.kdg.programming5project.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/artists")
public class ArtistController {
    private Logger logger = LoggerFactory.getLogger(ArtistController.class);
    private ArtistService artistsService;

    public ArtistController(ArtistService artistsService) {
        logger.debug("Creating ArtistController...");
        this.artistsService = artistsService;
    }

    @GetMapping
    public ModelAndView showAllArtists() {
        logger.debug("Running the showAllArtists method...");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("artists");
        mav.addObject("artists", artistsService.getAll());
        mav.addObject("countries", Countries.values());
        mav.addObject("artist", new AddArtistDTO());
        return mav;
    }

    @GetMapping("/detail/{artistId}")
    public ModelAndView showArtistDetail(@PathVariable("artistId") long artistId) {
        logger.debug("Showing artist detail");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("detail_artist");
        Artist artist = artistsService.getById(artistId);
        mav.addObject("artist", artist);
        mav.addObject("countries", Countries.values());
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
