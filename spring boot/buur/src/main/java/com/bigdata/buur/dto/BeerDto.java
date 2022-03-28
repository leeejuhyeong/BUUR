package com.bigdata.buur.dto;


import com.bigdata.buur.enums.BeerCategory;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class BeerDto {
    @Builder
    @Getter
    public static class LikeBeer {
        private Long beerNo;
        private String beerName;
        private boolean like;
    }
}
