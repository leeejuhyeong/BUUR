package com.bigdata.buur.beer.dto;


import com.bigdata.buur.review.dto.ReviewScore;
import com.bigdata.buur.review.dto.ReviewScoreInterface;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BeerDto {

    @Builder
    @Getter @Setter
    @ToString
    public static class CommonBeer {
        @ApiModelProperty("맥주 번호")
        private Long beerNo;
        @ApiModelProperty("맥주 이름")
        private String beerName;
        @ApiModelProperty("맥주 도수")
        private Double abv;
        @ApiModelProperty("맥주 종류")
        private String type;
        @ApiModelProperty("맥주 사진 경로")
        private String imagePath;
        @ApiModelProperty("맥주 사진")
        private byte[] beerImage;
    }

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
        @ApiModelProperty("맥주 리뷰 점수별 개수")
        @Builder.Default
        private List<ReviewScore> reviewScoreList = new ArrayList<>();

        public void addReviewScoreList(Map<Integer, Integer> reviewScoreMap) {
            for (Map.Entry<Integer, Integer> entry : reviewScoreMap.entrySet()) {
                this.reviewScoreList.add(ReviewScore.builder()
                        .score(entry.getKey())
                        .count(entry.getValue())
                        .build());
            }
        }
    }
}
