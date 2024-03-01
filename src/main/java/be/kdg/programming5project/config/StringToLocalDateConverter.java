package be.kdg.programming5project.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;

import java.time.LocalDate;

public class StringToLocalDateConverter implements Converter<String, LocalDate> {
    private static final Logger logger = LoggerFactory.getLogger(StringToLocalDateConverter.class);
    @Override
    public LocalDate convert(String source) {
        logger.debug("Using converter to convert " + source);
        return LocalDate.parse(source);
    }
}
