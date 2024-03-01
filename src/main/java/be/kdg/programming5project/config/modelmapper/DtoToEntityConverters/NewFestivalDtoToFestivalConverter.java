package be.kdg.programming5project.config.modelmapper.DtoToEntityConverters;

import be.kdg.programming5project.controllers.api.dto.NewFestivalDto;
import be.kdg.programming5project.model.Festival;
import org.modelmapper.AbstractConverter;

public class NewFestivalDtoToFestivalConverter extends AbstractConverter<NewFestivalDto, Festival> {
    @Override
    protected Festival convert(NewFestivalDto source) {
        if (source == null) return null;
        var target = new Festival();

        target.setName(source.getName());
        target.setLengthDays(source.getLengthDays());
        target.setType(source.getFestivalType());
        target.setStartDate(source.getStartDate());
        target.setOrganizer(source.getOrganizer());
        target.setCost(source.getCost());
        target.setLocation(null);
        target.setFestivalManager(null);

        return target;
    }
}
