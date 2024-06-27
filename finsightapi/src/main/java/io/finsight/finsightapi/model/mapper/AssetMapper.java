package io.finsight.finsightapi.model.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import io.finsight.finsightapi.model.dto.AssetDto;
import io.finsight.finsightapi.model.entity.AssetEntity;

@Component
public class AssetMapper implements Mapper<AssetEntity, AssetDto> {
    private ModelMapper modelMapper;

    public AssetMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public AssetDto mapTo(AssetEntity assetEntity) {
        return modelMapper.map(assetEntity, AssetDto.class);
    }

    @Override
    public AssetEntity mapFrom(AssetDto assetDto) {
        return modelMapper.map(assetDto, AssetEntity.class);
    }
}
