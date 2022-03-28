package com.bigdata.buur.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchHistoryDto {

    private String keyword;
    private Long userNo;

}
