package com.bigdata.buur.macbti.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DrinkBeerDto {
    @ApiModelProperty("맥주 번호")
    private Long beerId;
    @ApiModelProperty("사용자 번호")
    private Long id;
    @ApiModelProperty("맥주 마신 횟수")
    private int count;
    @ApiModelProperty("맥주 이름")
    private String beerName;
}