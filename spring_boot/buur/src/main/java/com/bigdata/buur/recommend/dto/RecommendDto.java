package com.bigdata.buur.recommend.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("추천 맥주")
public class RecommendDto {
    @ApiModelProperty("맥주 번호")
    private Long beerNo;
    @ApiModelProperty("맥주 이미지 경로")
    private String image;
    @ApiModelProperty("맥주 이름")
    private String beerName;
    @ApiModelProperty("맥주 좋아요")
    private boolean like;
    @ApiModelProperty("맥주 이미지")
    private byte[] beerImage;
}
