package be.kdg.programming5project.controllers.mvc;

import be.kdg.programming5project.model.Festival;
import be.kdg.programming5project.model.FestivalType;
import be.kdg.programming5project.exceptions.DatabaseEmptyException;
import be.kdg.programming5project.controllers.mvc.dto.AddFestivalDTO;
import be.kdg.programming5project.services.FestivalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/festivals")
public class FestivalController {
    private Logger logger = LoggerFactory.getLogger(FestivalController.class);
    private FestivalService festivalsService;

    public FestivalController(FestivalService festivalsService) {
        logger.debug("Creating FestivalController...");
        this.festivalsService = festivalsService;
    }

    @GetMapping
    public ModelAndView showAllFestivals() {
        logger.debug("Running the showAllFestivals method...");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("festivals");
        mav.addObject("festivals", festivalsService.getAll());
        mav.addObject("festival", new AddFestivalDTO());
        mav.addObject("festivalTypes", FestivalType.values());
        return mav;
    }

    @GetMapping("/detail/{festivalId}")
    public ModelAndView showFestivalDetail(@PathVariable("festivalId") long festivalId) {
        logger.debug("Showing festival detail");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("detail_festival");
        Festival festival = festivalsService.getById(festivalId);
        mav.addObject("festival", festival);
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
