package be.kdg.programming5project.controllers.api;

import be.kdg.programming5project.model.Artist;
import be.kdg.programming5project.controllers.api.dto.ArtistDto;
import be.kdg.programming5project.controllers.api.dto.NewArtistDto;
import be.kdg.programming5project.model.user.ArtistManager;
import be.kdg.programming5project.model.user.User;
import be.kdg.programming5project.security.CustomUserDetails;
import be.kdg.programming5project.services.ArtistService;
import be.kdg.programming5project.services.ImageService;
import be.kdg.programming5project.services.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/artists")
public class ArtistRestController {
    private Logger logger = LoggerFactory.getLogger(ArtistRestController.class);

    private final ArtistService artistService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public ArtistRestController(ArtistService artistService, ModelMapper modelMapper,
                                UserService userService) {
        this.artistService = artistService;
        this.modelMapper = modelMapper;
        this.userService = userService;

    }

    @GetMapping("{artistId}")
    public ResponseEntity<ArtistDto> getSingleArtist(@PathVariable("artistId") long artistId) {
        var artist = artistService.getById(artistId);
        if (artist != null) {
            return ResponseEntity.ok(modelMapper.map(artist, ArtistDto.class));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ArtistDto>> getAllArtists() {
        var artists = artistService.getAll();
        if (artists.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        var artistDtos = artists
                .stream()
                .map(artist -> modelMapper.map(artist, ArtistDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(artistDtos, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ARTIST_MANAGER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ArtistDto> addNewArtist(@Valid @RequestBody NewArtistDto artistDto, @AuthenticationPrincipal CustomUserDetails userDetails) throws Exception {
        Artist newArtist = modelMapper.map(artistDto, Artist.class);

        if (userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ARTIST_MANAGER"))) {
            newArtist.setArtistManager((ArtistManager) userService.findUserById(userDetails.getUserId()));
        }

        artistService.add(newArtist);

        return new ResponseEntity<>(modelMapper.map(newArtist, ArtistDto.class), HttpStatus.CREATED);
    }

    // This is used for client testing
    @PostMapping("client")
    public ResponseEntity<ArtistDto> addNewArtistClient(@Valid @RequestBody NewArtistDto artistDto) throws Exception {
        Artist newArtist = modelMapper.map(artistDto, Artist.class);

        newArtist.setArtistManager((ArtistManager) userService.findUser("am1"));

        artistService.add(newArtist);

        return new ResponseEntity<>(modelMapper.map(newArtist, ArtistDto.class), HttpStatus.CREATED);
    }

    @PutMapping("{artistId}")
    public ResponseEntity<ArtistDto> updateArtist(@PathVariable("artistId") long artistId, @RequestBody ArtistDto artistDto) {
        var artist = artistService.getById(artistId);

        if (artist == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (artistId != artistDto.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Artist updatedArtist = modelMapper.map(artistDto, Artist.class);

        if (updatedArtist.getId() == 0 || updatedArtist.getName() == null || updatedArtist.getBirthDate() == null ||
                updatedArtist.getCountry() == null || updatedArtist.getHitSong() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        artist.setName(updatedArtist.getName());
        artist.setBirthDate(updatedArtist.getBirthDate());
        artist.setHitSong(updatedArtist.getHitSong());
        artist.setCountry(updatedArtist.getCountry());
        artist.setOnePersonAct(updatedArtist.isOnePersonAct());
        artistService.update(artist);
        ArtistDto response = modelMapper.map(artist, ArtistDto.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("{artistId}")
    public ResponseEntity<Void> deleteArtist(@PathVariable("artistId") long artistId) {
        if (artistService.getById(artistId) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        artistService.delete(artistId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/search")
    public ResponseEntity<List<ArtistDto>> searchArtists(@RequestParam String searchValue) {
        logger.debug("Trying to find artist with "  + searchValue);
        var artists = artistService.searchArtists(searchValue);
        if (artists.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(
                    artists.stream().map(artist -> new ArtistDto(
                            artist.getId(), artist.getName(), artist.getBirthDate(), artist.getAge(), artist.getHitSong(),
                            artist.isOnePersonAct(), artist.getCountry()
                    )).toList(),
                    HttpStatus.OK
            );
        }
    }

}
