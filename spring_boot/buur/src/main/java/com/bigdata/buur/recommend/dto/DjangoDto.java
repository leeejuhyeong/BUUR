package com.bigdata.buur.recommend.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class DjangoDto {
    @ApiModelProperty("맥주 번호")
    private Long beer_id;
    @ApiModelProperty("맥주 이미지 경로")
    private String image;
    @ApiModelProperty("맥주 이름")
    private String name;
    @ApiModelProperty("맥주 좋아요")
    private boolean likes;
    @ApiModelProperty("맥주 이미지")
    private byte[] beerImage;
}
