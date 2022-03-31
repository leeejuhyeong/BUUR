package com.bigdata.buur.user.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@ApiModel
public class SurveyDto {

    @ApiModelProperty("유저 번호")
    private Long userNo;
    @ApiModelProperty("맥주 번호")
    private Long beerNo;
    private Double taste;
    private Double aroma;
    @ApiModelProperty("리뷰 점수")
    private Integer rank;
    @ApiModelProperty("리뷰 내용")
    private String content;
}
