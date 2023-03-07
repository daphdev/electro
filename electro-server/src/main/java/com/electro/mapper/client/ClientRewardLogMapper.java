package com.electro.mapper.client;

import com.electro.dto.client.ClientRewardLogResponse;
import com.electro.entity.reward.RewardLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClientRewardLogMapper {

    @Mapping(source = "id", target = "rewardLogId")
    @Mapping(source = "createdAt", target = "rewardLogCreatedAt")
    @Mapping(source = "score", target = "rewardLogScore")
    @Mapping(source = "type", target = "rewardLogType")
    @Mapping(source = "note", target = "rewardLogNote")
    ClientRewardLogResponse entityToResponse(RewardLog rewardLog);

    List<ClientRewardLogResponse> entityToResponse(List<RewardLog> rewardLogs);

}
