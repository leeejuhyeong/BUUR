package com.bigdata.buur.entity;

import com.bigdata.buur.enums.BeerCategory;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Beer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "beer_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private BeerCategory beerCategory;

    private String name;

    private String engName;

    private Double abv;

    private String origin;

    private String food;

    private String image;

    private Double ibu;

}
