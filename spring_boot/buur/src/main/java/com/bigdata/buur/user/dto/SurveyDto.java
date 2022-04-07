package com.bigdata.buur.user.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@ApiModel
public class SurveyDto {

    @ApiModelProperty("맥주 번호")
    private Long beerNo;
    @ApiModelProperty("리뷰 점수")
    private Integer rank;
    @ApiModelProperty("리뷰 내용")
    private String content;
}
