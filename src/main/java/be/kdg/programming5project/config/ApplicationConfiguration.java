package be.kdg.programming5project.config;

import be.kdg.programming5project.config.modelmapper.DtoToEntityConverters.NewArtistDtoToArtistConverter;
import be.kdg.programming5project.config.modelmapper.DtoToEntityConverters.NewFestivalDtoToFestivalConverter;
import be.kdg.programming5project.config.modelmapper.EntityToDtoConverters.ArtistToArtistDtoConverter;
import be.kdg.programming5project.config.modelmapper.EntityToDtoConverters.FestivalToFestivalDtoConverter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {
    @Bean
    public ModelMapper modelMapper() {
        var mapper = new ModelMapper();
        mapper.addConverter(new NewArtistDtoToArtistConverter());
        mapper.addConverter(new ArtistToArtistDtoConverter());
        mapper.addConverter(new NewFestivalDtoToFestivalConverter());
        mapper.addConverter(new FestivalToFestivalDtoConverter());
        return mapper;
    }
}
