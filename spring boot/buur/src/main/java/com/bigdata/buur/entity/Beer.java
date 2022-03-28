package com.bigdata.buur.entity;

import com.bigdata.buur.enums.BeerCategory;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Beer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long beerNo;

    @Enumerated(EnumType.STRING)
    private BeerCategory beerCategory;

    private String beerName;

    private String beerEngName;

    private Double beerAbv;

    private String beerOrigin;

    private String beerFood;

    private String beerImage;

    private Double beerIbu;

}
