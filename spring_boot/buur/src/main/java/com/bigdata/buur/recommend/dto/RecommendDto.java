package com.bigdata.buur.recommend.dto;

import lombok.*;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendDto {
    private Long beer_no;
    private String beer_image;
    private String beer_name;
    private boolean likes;
    private byte[] beerImage;
}
