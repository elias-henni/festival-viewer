package be.kdg.programming5project.controllers.mvc;

import be.kdg.programming5project.controllers.mvc.dto.AddArtistDTO;
import be.kdg.programming5project.controllers.mvc.dto.AddFestivalDTO;
import be.kdg.programming5project.model.Countries;
import be.kdg.programming5project.model.FestivalType;
import be.kdg.programming5project.security.CustomUserDetails;
import be.kdg.programming5project.services.ArtistService;
import be.kdg.programming5project.services.FestivalService;
import be.kdg.programming5project.services.LocationService;
import be.kdg.programming5project.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/backend")
public class BackendController {
    private ArtistService artistsService;
    private FestivalService festivalService;

    public BackendController(ArtistService artistsService, FestivalService festivalService) {
        this.artistsService = artistsService;
        this.festivalService = festivalService;
    }

    @GetMapping
    public ModelAndView showBackend() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("backend");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            mav.setViewName("error");
            return mav;
        }
        if (auth.getAuthorities().stream().anyMatch(a -> a.equals(new SimpleGrantedAuthority("ROLE_ADMIN")))) {
            mav.addObject("artists", artistsService.getAll());
            mav.addObject("festivals", festivalService.getAll());
        } else {
            CustomUserDetails customUser = (CustomUserDetails)auth.getPrincipal();
            // Get id of current user
            long userId = customUser.getUserId();
            mav.addObject("artists", artistsService.getArtistsManagedByArtistManagerId(userId));
            mav.addObject("festivals", festivalService.getFestivalsManagedByFestivalManagerId(userId));
        }
        mav.addObject("artist", new AddArtistDTO());
        mav.addObject("countries", Countries.values());
        mav.addObject("festival", new AddFestivalDTO());
        mav.addObject("festivalTypes", FestivalType.values());

        return mav;
    }
}
