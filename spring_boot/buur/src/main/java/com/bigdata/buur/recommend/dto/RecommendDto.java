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
    private Long beer_no;
    @ApiModelProperty("맥주 이미지 경로")
    private String beer_image;
    @ApiModelProperty("맥주 이름")
    private String beer_name;
    @ApiModelProperty("맥주 좋아요")
    private boolean likes;
    @ApiModelProperty("맥주 이미지")
    private byte[] beerImage;
}
