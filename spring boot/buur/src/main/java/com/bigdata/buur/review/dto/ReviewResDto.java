package com.bigdata.buur.review.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter @Setter
public class ReviewResDto {

    private String userNickName;
    private Integer rank;
    private LocalDateTime reviewDt;
    private String content;


}
