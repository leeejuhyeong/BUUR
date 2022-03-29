package com.bigdata.buur.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class UserDto {

    private String userId;
    private String userNickname;
    private String userEmail;
    private String userPassword;
    private Integer userDrink; // 주량

}
