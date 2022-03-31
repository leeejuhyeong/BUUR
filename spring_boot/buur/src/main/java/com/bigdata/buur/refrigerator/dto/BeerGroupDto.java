package com.bigdata.buur.refrigerator.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class BeerGroupDto {

    @ApiModelProperty("맥주 그룹 번호")
    Long beerGroupId;
    @ApiModelProperty("사용자 번호")
    Long id;

}
