package com.bigdata.buur.user.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ApiModel
public class UserDto {

    @ApiModelProperty("유저 아이디")
    @NotBlank(message = "유저 아이디가 공백이거나 없습니다.")
    private String userId;
    @ApiModelProperty("유저 닉네임")
    @NotBlank(message = "유저 닉네임이 공백이거나 없습니다.")
    private String userNickname;
    @ApiModelProperty("유저 이메일")
    @NotBlank(message = "유저 이메일이 공백이거나 없습니다.")
    private String userEmail;
    @ApiModelProperty("유저 비밀번호")
    @NotBlank(message = "유저 비밀번호가 공백이거나 없습니다.")
    private String userPassword;
    @ApiModelProperty("유저 주량")
    private Integer userDrink; // 주량

}
