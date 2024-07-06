package io.finsight.finsightapi.model.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import io.finsight.finsightapi.model.dto.HoldingDto;
import io.finsight.finsightapi.model.entity.HoldingEntity;

@Component
public class HoldingMapper implements Mapper<HoldingEntity, HoldingDto> {
    private ModelMapper modelMapper;

    public HoldingMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public HoldingDto mapTo(HoldingEntity holdingEntity) {
        return modelMapper.map(holdingEntity, HoldingDto.class);
    }

    @Override
    public HoldingEntity mapFrom(HoldingDto userDto) {
        return modelMapper.map(userDto, HoldingEntity.class);
    }
}
