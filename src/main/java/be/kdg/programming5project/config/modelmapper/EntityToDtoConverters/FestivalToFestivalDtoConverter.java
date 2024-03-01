package be.kdg.programming5project.config.modelmapper.EntityToDtoConverters;

import be.kdg.programming5project.controllers.api.dto.FestivalDto;
import be.kdg.programming5project.model.Festival;
import org.modelmapper.AbstractConverter;

public class FestivalToFestivalDtoConverter extends AbstractConverter<Festival, FestivalDto> {
    @Override
    protected FestivalDto convert(Festival source) {
        if (source == null) return null;
        var target = new FestivalDto();

        target.setId(source.getId());
        target.setName(source.getName());
        target.setStartDate(source.getStartDate());
        target.setLengthDays(source.getLength());
        target.setOrganizer(source.getOrganizer());
        target.setFestivalType(source.getType());
        target.setCost(source.getCost());
        return target;
    }
}
