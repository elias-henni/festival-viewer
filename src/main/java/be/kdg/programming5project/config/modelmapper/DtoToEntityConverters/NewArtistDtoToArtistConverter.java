package be.kdg.programming5project.config.modelmapper.DtoToEntityConverters;

import be.kdg.programming5project.controllers.api.dto.NewArtistDto;
import be.kdg.programming5project.model.Artist;
import org.modelmapper.AbstractConverter;

import java.time.LocalDate;
import java.time.Period;

public class NewArtistDtoToArtistConverter extends AbstractConverter<NewArtistDto, Artist> {
    @Override
    protected Artist convert(NewArtistDto source) {
        if (source == null) return null;
        var target = new Artist();

        target.setName(source.getName());
        target.setBirthDate(source.getBirthDate());
        target.setHitSong(source.getHitSong());
        target.setAge(Period.between(source.getBirthDate(), LocalDate.now()).getYears());
        target.setOnePersonAct(source.getIsOnePersonAct());
        target.setCountry(source.getCountry());
        target.setArtistManager(null);

        return target;
    }
}
