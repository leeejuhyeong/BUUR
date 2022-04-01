package com.bigdata.buur.review.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Builder
@Getter @Setter
@ApiModel
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {

    @ApiModelProperty("맥주 번호")
    private Long beerNo;
    @Deprecated
    private Double taste;
    @Deprecated
    private Double aroma;
    @ApiModelProperty("맥주 리뷰 점수")
    private Integer rank;
    @ApiModelProperty("리뷰 내용")
    private String content;

}
