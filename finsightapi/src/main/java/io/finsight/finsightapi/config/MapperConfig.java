package io.finsight.finsightapi.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.finsight.finsightapi.model.dto.HoldingDto;
import io.finsight.finsightapi.model.entity.HoldingEntity;

@Configuration
public class MapperConfig {
    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.createTypeMap(HoldingDto.class, HoldingEntity.class)
            .addMappings(mapper -> mapper.skip(HoldingEntity::setUser));
        
        modelMapper.createTypeMap(HoldingEntity.class, HoldingDto.class)
            .addMappings(mapper -> mapper.map(src -> src.getUser().getUsername(), HoldingDto::setUsername));

        return modelMapper;
    }
}
