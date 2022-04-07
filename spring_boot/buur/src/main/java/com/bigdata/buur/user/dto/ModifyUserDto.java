package com.bigdata.buur.user.dto;

import lombok.*;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModifyUserDto {
    private String originPassword;
    private String newPassword;
}
