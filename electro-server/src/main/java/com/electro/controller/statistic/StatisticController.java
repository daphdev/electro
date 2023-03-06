package com.electro.controller.statistic;

import com.electro.constant.AppConstants;
import com.electro.dto.statistic.StatisticResponse;
import com.electro.service.statistic.StatisticService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@AllArgsConstructor
@CrossOrigin(AppConstants.FRONTEND_HOST)
public class StatisticController {

    private StatisticService statisticService;

    @GetMapping
    public ResponseEntity<StatisticResponse> getStatistic() {
        return ResponseEntity.status(HttpStatus.OK).body(statisticService.getStatistic());
    }

}
