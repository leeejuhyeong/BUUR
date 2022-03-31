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
public class ReviewResDto {

    @ApiModelProperty("유저 닉네임")
    private String userNickName;
    @ApiModelProperty("맥주 리뷰 점수")
    private Integer rank;
    @ApiModelProperty("리뷰 날짜")
    private LocalDateTime reviewDt;
    @ApiModelProperty("리뷰 내용")
    private String content;


}
