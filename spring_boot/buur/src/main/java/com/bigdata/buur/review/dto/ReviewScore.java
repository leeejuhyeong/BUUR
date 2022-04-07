package com.bigdata.buur.review.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter @Setter
@ApiModel("리뷰 점수 개수")
public class ReviewScore {
    @ApiModelProperty("점수")
    private Integer score;
    @ApiModelProperty("개수")
    private Integer count;
}
