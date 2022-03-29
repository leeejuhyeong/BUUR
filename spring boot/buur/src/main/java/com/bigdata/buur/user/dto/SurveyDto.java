package com.bigdata.buur.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SurveyDto {
    private Long userNo;
    private Long beerNo;
    private Double reviewTaste;
    private Double reviewAroma;
    private Integer reviewRank;
    private String reviewContent;
}
