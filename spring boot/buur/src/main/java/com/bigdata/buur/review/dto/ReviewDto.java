package com.bigdata.buur.review.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter @Setter
public class ReviewDto {

    @Deprecated
    private Long userNo;

    private Long beerNo;
    private Double taste;
    private Double aroma;
    private Integer rank;
    private LocalDateTime reviewDt;
    private String content;

}
