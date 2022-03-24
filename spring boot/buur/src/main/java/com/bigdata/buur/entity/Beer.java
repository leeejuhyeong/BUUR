package com.bigdata.buur.entity;

import com.bigdata.buur.enums.BeerCategory;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString
public class Beer {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
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
