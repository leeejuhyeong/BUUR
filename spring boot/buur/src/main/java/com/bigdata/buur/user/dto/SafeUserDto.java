package com.bigdata.buur.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SafeUserDto {

    private String userId;
    private String userNickname;
    private String userEmail;
    private Integer userDrink;
    private byte[] userProfile;

}
