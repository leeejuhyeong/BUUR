package com.bigdata.buur.search.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchHistoryDto {

    private Long searchId;
    private String keyword;
    private Long userNo;

}
