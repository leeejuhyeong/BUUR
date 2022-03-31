package com.bigdata.buur.review.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter @Setter
@ApiModel
public class ReviewDto {

    @Deprecated
    private Long userNo;

    @ApiModelProperty("맥주 번호")
    private Long beerNo;
    private Double taste;
    private Double aroma;
    @ApiModelProperty("맥주 리뷰 점수")
    private Integer rank;
    private LocalDateTime reviewDt;
    @ApiModelProperty("리뷰 내용")
    private String content;

}
