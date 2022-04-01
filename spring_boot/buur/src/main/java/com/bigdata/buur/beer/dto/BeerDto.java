package com.bigdata.buur.beer.dto;


import com.bigdata.buur.enums.BeerCategory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.apache.commons.io.IOUtils;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.IOException;
import java.io.InputStream;

public class BeerDto {
    @Builder
    @Getter @Setter
    public static class LikeBeer {
        @ApiModelProperty("맥주 번호")
        private Long beerNo;
        @ApiModelProperty("맥주 이름")
        private String beerName;
        @ApiModelProperty("맥주 좋아요")
        private boolean like;
        @ApiModelProperty("맥주 사진 경로")
        private String imagePath;
        @ApiModelProperty("맥주 사진")
        private byte[] beerImage;
    }

    @Builder
    @Getter @Setter
    @ApiModel("BeerDto")
    public static class Details {
        @ApiModelProperty("맥주 번호")
        private Long beerNo;
        @ApiModelProperty("맥주 이름")
        private String name;
        @ApiModelProperty("맥주 영어 이름")
        private String engName;
        @ApiModelProperty("맥주 도수")
        private Double abv;
        @ApiModelProperty("맥주 원산지")
        private String origin;
        @ApiModelProperty("어울리는 안주")
        private String food;
        @ApiModelProperty("맥주 쓴맛")
        private Double ibu;
        @ApiModelProperty("맥주 좋아요")
        private boolean like;
        @ApiModelProperty("맥주 이미지 경로")
        private String imagePath;
        @ApiModelProperty("맥주 이미지")
        private byte[] beerImage;
    }
}
