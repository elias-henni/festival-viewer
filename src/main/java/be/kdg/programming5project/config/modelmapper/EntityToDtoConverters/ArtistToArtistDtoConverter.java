package be.kdg.programming5project.config.modelmapper.EntityToDtoConverters;

import be.kdg.programming5project.controllers.api.dto.ArtistDto;
import be.kdg.programming5project.model.Artist;
import org.modelmapper.AbstractConverter;

public class ArtistToArtistDtoConverter extends AbstractConverter<Artist, ArtistDto> {
    @Override
    protected ArtistDto convert(Artist source) {
        if (source == null) return null;
        var target = new ArtistDto();

        target.setId(source.getId());
        target.setName(source.getName());
        target.setBirthDate(source.getBirthDate());
        target.setAge(source.getAge());
        target.setHitSong(source.getHitSong());
        target.setOnePersonAct(source.isOnePersonAct());
        target.setCountry(source.getCountry());
        return target;
    }
}
