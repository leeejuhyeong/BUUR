package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Basket {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "basket_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="beer_id")
    private Beer beer;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private BeerGroup beerGroup;

}
