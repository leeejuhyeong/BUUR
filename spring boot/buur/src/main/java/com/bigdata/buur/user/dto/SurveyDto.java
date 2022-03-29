package com.bigdata.buur.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SurveyDto {
    private Long userNo;
    private Long beerNo;
    private Double taste;
    private Double aroma;
    private Integer rank;
    private String content;
}
