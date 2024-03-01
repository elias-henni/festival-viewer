package be.kdg.programming5project.seeding;

import be.kdg.programming5project.model.*;
import be.kdg.programming5project.model.user.Administrator;
import be.kdg.programming5project.model.user.ArtistManager;
import be.kdg.programming5project.model.user.FestivalManager;
import be.kdg.programming5project.model.user.User;
import be.kdg.programming5project.repositories.*;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static be.kdg.programming5project.model.Countries.*;

@Configuration
public class SeedData implements CommandLineRunner {
    private Logger logger = LoggerFactory.getLogger(SeedData.class);

    private final ArtistRepository artistRepository;
    private final FestivalRepository festivalRepository;
    private final ArtistFestivalRepository artistFestivalRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    public SeedData(ArtistRepository artistRepository,
                    FestivalRepository festivalRepository,
                    ArtistFestivalRepository artistFestivalRepository,
                    LocationRepository locationRepository,
                    UserRepository userRepository, ImageRepository imageRepository) {
        this.artistRepository = artistRepository;
        this.festivalRepository = festivalRepository;
        this.artistFestivalRepository = artistFestivalRepository;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        logger.debug("Filling the db");

        // Save images
        // Artists
        File playboiCartiFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/playboicarti.png");
        Image playboiCartiImage = new Image(playboiCartiFile.getName(), "image/png", Files.readAllBytes(playboiCartiFile.toPath()));

        File lilUziVertFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/liluzivert.png");
        Image lilUziVertImage = new Image(lilUziVertFile.getName(), "image/png", Files.readAllBytes(lilUziVertFile.toPath()));

        File billieEilishFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/billieeilish.png");
        Image billieEilishImage = new Image(billieEilishFile.getName(), "image/png", Files.readAllBytes(billieEilishFile.toPath()));

        File harryStylesFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/harrystyles.png");
        Image harryStylesImage = new Image(harryStylesFile.getName(), "image/png", Files.readAllBytes(harryStylesFile.toPath()));

        File martinGarrixFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/martingarrix.png");
        Image martinGarrixImage = new Image(martinGarrixFile.getName(), "image/png", Files.readAllBytes(martinGarrixFile.toPath()));

        // Festivals
        File lyricalLemonadeSummerSmashFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/lyricallemonadesummersmash.png");
        Image lyricalLemonadeSummerSmashImage = new Image(lyricalLemonadeSummerSmashFile.getName(), "image/png", Files.readAllBytes(lyricalLemonadeSummerSmashFile.toPath()));

        File coachellaFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/coachella.png");
        Image coachellaImage = new Image(coachellaFile.getName(), "image/png", Files.readAllBytes(coachellaFile.toPath()));

        File tomorrowlandFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/tomorrowland.png");
        Image tomorrowlandImage = new Image(tomorrowlandFile.getName(), "image/png", Files.readAllBytes(tomorrowlandFile.toPath()));

        File ultraMusicFestivalFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/ultramusicfestival.png");
        Image ultraMusicFestivalImage = new Image(ultraMusicFestivalFile.getName(), "image/png", Files.readAllBytes(ultraMusicFestivalFile.toPath()));

        File rollingLoudCaliforniaFile = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/rollingloudcalifornia.png");
        Image rollingLoudCaliforniaImage = new Image(rollingLoudCaliforniaFile.getName(), "image/png", Files.readAllBytes(rollingLoudCaliforniaFile.toPath()));

        // Home Page
        File artists = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/artists.png");
        Image artistImage = new Image(artists.getName(), "image/png", Files.readAllBytes(artists.toPath()));

        File festivals = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/festivals.png");
        Image festivalsImage = new Image(festivals.getName(), "image/png", Files.readAllBytes(festivals.toPath()));

        File locations = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/locations.png");
        Image locationsImage = new Image(locations.getName(), "image/png", Files.readAllBytes(locations.toPath()));

        File defaultArtist = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/defaultArtist.png");
        Image defaultArtistImage = new Image(defaultArtist.getName(), "image/png", Files.readAllBytes(defaultArtist.toPath()));

        File defaultFestival = new File("/Users/eliashenni/Documents/acs3/programming-5-retake/programming-5/src/main/resources/static/media/defaultFestival.png");
        Image defaultFestivalImage = new Image(defaultFestival.getName(), "image/png", Files.readAllBytes(defaultFestival.toPath()));

        List<Image> images = List.of(playboiCartiImage, lilUziVertImage, harryStylesImage, martinGarrixImage, billieEilishImage,
                lyricalLemonadeSummerSmashImage, coachellaImage, tomorrowlandImage, ultraMusicFestivalImage, rollingLoudCaliforniaImage,
                artistImage, festivalsImage, locationsImage, defaultArtistImage, defaultFestivalImage);

        imageRepository.saveAll(images);

        // Create artists
        Artist playboiCarti = new Artist("Playboi Carti", LocalDate.of(1996, 9, 13), "Magnolia", true, USA, playboiCartiImage, null);
        Artist lilUziVert = new Artist("Lil Uzi Vert", LocalDate.of(1995, 7, 31), "XO Tour Llif3", true, USA, lilUziVertImage, null);
        Artist billieEilish = new Artist("Billie Eilish", LocalDate.of(2001, 12, 18), "bad guy", true, USA, billieEilishImage, null);
        Artist harryStyles =new Artist("Harry Styles", LocalDate.of(1994, 2, 1), "Watermelon Sugar", true, ENGLAND, harryStylesImage, null);
        Artist martinGarrix = new Artist("Martin Garrix", LocalDate.of(1996, 5, 14), "Animals", true, NETHERLANDS, martinGarrixImage, null);
        List<Artist> allArtists = new ArrayList<>(List.of(playboiCarti, lilUziVert, billieEilish, harryStyles, martinGarrix));

        // Create Festivals
        Festival summerSmash = new Festival("Lyrical Lemonade Summer Smash", 3, FestivalType.RAP, "SPKRBX", LocalDate.of(2021, 8, 20), 350.00, lyricalLemonadeSummerSmashImage, null);
        Festival rollingLoudCali = new Festival("Rolling Loud California", 3, FestivalType.RAP, "Live Nation", LocalDate.of(2021, 12, 10), 541.00, rollingLoudCaliforniaImage, null);
        Festival tomorrowland = new Festival("Tomorrowland", 10, FestivalType.EDM, "We Are One World", LocalDate.of(2022, 7, 22), 295.00, tomorrowlandImage, null);
        Festival ultraMusicFestival = new Festival("Ultra Music Festival", 3, FestivalType.EDM, "Ultra Enterprises", LocalDate.of(2022, 3, 25), 550.00, ultraMusicFestivalImage, null);
        Festival coachella = new Festival("Coachella", 10, FestivalType.POP, "Golden Voice", LocalDate.of(2022, 4, 15), 449.00, coachellaImage, null);
        List<Festival> allFestivals = new ArrayList<>(List.of(summerSmash, rollingLoudCali, tomorrowland, ultraMusicFestival, coachella));

        // Create Locations
        Location festPark = new Location("Fest Park", "Lombardenvest 8", "Antwerpen", Countries.BELGIUM);
        Location eliZone = new Location("Eli Hometown", "18 Night Pasture Lane", "South Chittenden", Countries.USA);
        List<Location> allLocations = new ArrayList<>(List.of(festPark, eliZone));

        // Add festivals to locations
        eliZone.addFestival(summerSmash);
        eliZone.addFestival(coachella);

        festPark.addFestival(rollingLoudCali);
        festPark.addFestival(tomorrowland);
        festPark.addFestival(ultraMusicFestival);

        // Add locations and artists to festivals
        summerSmash.addLocation(eliZone);
        ArtistFestival sum1 = new ArtistFestival(playboiCarti, summerSmash);
        ArtistFestival sum2 = new ArtistFestival(lilUziVert, summerSmash);

        rollingLoudCali.addLocation(festPark);
        ArtistFestival roll1 = new ArtistFestival(playboiCarti, rollingLoudCali);

        tomorrowland.addLocation(festPark);
        ArtistFestival tom1 = new ArtistFestival(martinGarrix, tomorrowland);

        ultraMusicFestival.addLocation(festPark);
        ArtistFestival ultra1 = new ArtistFestival(martinGarrix, ultraMusicFestival);

        coachella.addLocation(eliZone);
        ArtistFestival coach1 = new ArtistFestival(playboiCarti, coachella);
        ArtistFestival coach2 = new ArtistFestival(lilUziVert, coachella);
        ArtistFestival coach3 = new ArtistFestival(billieEilish, coachella);
        ArtistFestival coach4 = new ArtistFestival(harryStyles, coachella);

        // All artist festival relations
        List<ArtistFestival> allArtistFestivals = new ArrayList<>(List.of(sum1, sum2, roll1, tom1, ultra1, coach1, coach2, coach3, coach4));

        // Create Users
        String secret = new BCryptPasswordEncoder().encode("test");
        var admin = new Administrator("admin", secret);

        var artistManager = new ArtistManager("am1", secret);

        var artistManager2 = new ArtistManager("am2", secret);

        var festivalManager = new FestivalManager("fm1", secret);

        var festivalManager2 = new FestivalManager("fm2", secret);

        List<User> users = List.of(admin, artistManager, artistManager2, festivalManager, festivalManager2);
        userRepository.saveAll(users);

        // Add Managers to artists and festivals
        playboiCarti.setArtistManager(artistManager);
        lilUziVert.setArtistManager(artistManager);
        billieEilish.setArtistManager(artistManager2);
        harryStyles.setArtistManager(artistManager2);
        martinGarrix.setArtistManager(artistManager2);

        summerSmash.setFestivalManager(festivalManager);
        rollingLoudCali.setFestivalManager(festivalManager);
        tomorrowland.setFestivalManager(festivalManager2);
        ultraMusicFestival.setFestivalManager(festivalManager2);
        coachella.setFestivalManager(festivalManager2);

        // Save artists, festivals, locations, artistFestivals, and users
        artistRepository.saveAll(allArtists);
        festivalRepository.saveAll(allFestivals);
        locationRepository.saveAll(allLocations);
        artistFestivalRepository.saveAll(allArtistFestivals);

        userRepository.save(admin);
        userRepository.save(artistManager);
        userRepository.save(artistManager2);
        userRepository.save(festivalManager);
        userRepository.save(festivalManager2);
    }
}
