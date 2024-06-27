package io.finsight.finsightapi.model.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import io.finsight.finsightapi.model.dto.UserDto;
import io.finsight.finsightapi.model.entity.UserEntity;

@Component
public class UserMapper implements Mapper<UserEntity, UserDto> {
    private ModelMapper modelMapper;

    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto mapTo(UserEntity userEntity) {
        return modelMapper.map(userEntity, UserDto.class);
    }

    @Override
    public UserEntity mapFrom(UserDto userDto) {
        return modelMapper.map(userDto, UserEntity.class);
    }
}
