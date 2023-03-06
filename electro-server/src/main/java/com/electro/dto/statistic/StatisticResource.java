package com.electro.dto.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public  class StatisticResource {
    private Long numberOfRegistration;
    private Date date;
}
