package com.bigdata.buur.beer.dto;


import com.bigdata.buur.enums.BeerCategory;
import lombok.*;
import org.apache.commons.io.IOUtils;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.IOException;
import java.io.InputStream;

public class BeerDto {
    @Builder
    @Getter
    public static class LikeBeer {
        private Long beerNo;
        private String beerName;
        private boolean like;
        private String imagePath;
        private byte[] beerImage;

        @Transactional
        public void addImage(InputStream inputStream) throws IOException {
            this.beerImage = IOUtils.toByteArray(inputStream);
        }
    }

    @Builder
    @Getter @Setter
    public static class Details {
        private Long beerNo;
        private String name;
        private String engName;
        private Double abv;
        private String origin;
        private String food;
        private String image;
        private Double ibu;
        private boolean like;
        private String imagePath;
        private byte[] beerImage;
    }
}
