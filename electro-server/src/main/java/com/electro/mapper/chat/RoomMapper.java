package com.electro.mapper.chat;

import com.electro.dto.chat.RoomRequest;
import com.electro.dto.chat.RoomResponse;
import com.electro.entity.chat.Room;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface RoomMapper extends GenericMapper<Room, RoomRequest, RoomResponse> {

    @Override
    @Mapping(source = "userId", target = "user")
    Room requestToEntity(RoomRequest request);

}
