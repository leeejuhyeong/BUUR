package com.bigdata.buur.user.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel
public class SafeUserDto {
    
    @ApiModelProperty("유저 아이디")
    private String userId;
    @ApiModelProperty("유저 닉네임")
    private String userNickname;
    @ApiModelProperty("유저 이메일")
    private String userEmail;
    @ApiModelProperty("유저 주량")
    private Integer userDrink;
    @ApiModelProperty("유저 프로필 사진")
    private byte[] userProfile;

}
