package be.kdg.programming5project.controllers.api;

import be.kdg.programming5project.controllers.api.dto.ArtistDto;
import be.kdg.programming5project.controllers.api.dto.FestivalDto;
import be.kdg.programming5project.controllers.api.dto.NewFestivalDto;
import be.kdg.programming5project.model.Festival;
import be.kdg.programming5project.model.user.FestivalManager;
import be.kdg.programming5project.security.CustomUserDetails;
import be.kdg.programming5project.services.FestivalService;
import be.kdg.programming5project.services.ImageService;
import be.kdg.programming5project.services.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/festivals")
public class FestivalRestController {
    private Logger logger = LoggerFactory.getLogger(FestivalRestController.class);

    private final FestivalService festivalService;

    private final UserService userService;
    private final ModelMapper modelMapper;

    public FestivalRestController(FestivalService festivalService, ModelMapper modelMapper,
                                  UserService userService) {
        this.festivalService = festivalService;
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    @GetMapping("{festivalId}")
    public ResponseEntity<FestivalDto> getSingleFestival(@PathVariable("festivalId") long festivalId) {
        var festival = festivalService.getById(festivalId);
        if (festival != null) {
            return ResponseEntity.ok(modelMapper.map(festival, FestivalDto.class));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<FestivalDto>> getAllFestivals() {
        var festivals = festivalService.getAll();
        if (festivals.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        var festivalDtos = festivals
                .stream()
                .map(festival -> modelMapper.map(festival, FestivalDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(festivalDtos, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_FESTIVAL_MANAGER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<FestivalDto> addNewFestival(@Valid @RequestBody NewFestivalDto festivalDto, @AuthenticationPrincipal CustomUserDetails userDetails) throws Exception {
        Festival newFestival = modelMapper.map(festivalDto, Festival.class);

        if (userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_FESTIVAL_MANAGER"))) {
            newFestival.setFestivalManager((FestivalManager) userService.findUserById(userDetails.getUserId()));
        }

        festivalService.add(newFestival);

        return new ResponseEntity<>(modelMapper.map(newFestival, FestivalDto.class), HttpStatus.CREATED);
    }

    @PutMapping("{festivalId}")
    public ResponseEntity<FestivalDto> updateFestival(@PathVariable long festivalId, @RequestBody @Valid FestivalDto festivalDto) {
        var festival = festivalService.getById(festivalId);
        if (festival == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (festivalId != festivalDto.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Festival updatedFestival = modelMapper.map(festivalDto, Festival.class);

        System.out.println(updatedFestival);

        if (updatedFestival.getId() == 0 || updatedFestival.getName() == null || updatedFestival.getStartDate() == null ||
                updatedFestival.getLengthDays() == 0 || updatedFestival.getType() == null || updatedFestival.getOrganizer() == null
                || updatedFestival.getCost() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        festival.setName(festivalDto.getName());
        festival.setLengthDays(festivalDto.getLengthDays());
        festival.setType(festivalDto.getfestivalType());
        festival.setOrganizer(festivalDto.getOrganizer());
        festival.setStartDate(festivalDto.getStartDate());
        festival.setCost(festivalDto.getCost());
        festivalService.update(festival);

        FestivalDto response = modelMapper.map(festival, FestivalDto.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("{festivalId}")
    public ResponseEntity<Void> deleteFestival(@PathVariable("festivalId") long festivalId) {
        if (festivalService.getById(festivalId) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        festivalService.delete(festivalId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("{festivalId}/artists")
    public ResponseEntity<List<ArtistDto>> getArtistsGoingToFestival(@PathVariable("festivalId") long festivalId) {
        if (festivalService.getById(festivalId) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        var artists = festivalService.getArtistsGoingToFestival(festivalId);
        if (artists.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        var artistDtos = artists
                .stream()
                .map(artist -> modelMapper.map(artist, ArtistDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(artistDtos, HttpStatus.OK);
    }
}
