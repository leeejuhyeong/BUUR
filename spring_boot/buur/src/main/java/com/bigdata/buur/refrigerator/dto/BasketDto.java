package com.bigdata.buur.refrigerator.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.apache.commons.io.IOUtils;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class BasketDto {

    @ApiModelProperty("사용자 번호")
    Long id;
    @ApiModelProperty("맥주 번호")
    Long beerId;
    @ApiModelProperty("맥주 그룹 번호")
    Long beerGroupId;
    @ApiModelProperty("맥주 사진 경로")
    private String imagePath;
    @ApiModelProperty("맥주 이름")
    private String beerName;
    @ApiModelProperty("맥주 이미지")
    private byte[] beerImage;

    @Transactional
    public void addImage(InputStream inputStream) throws IOException {
        this.beerImage = IOUtils.toByteArray(inputStream);
    }

}
