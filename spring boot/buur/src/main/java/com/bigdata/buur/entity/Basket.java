package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter @Setter @ToString
public class Basket {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long basketNo;

    @ManyToOne
    @JoinColumn(name="beer_no")
    private Beer beer;

    @ManyToOne
    @JoinColumn(name = "group_no")
    private BeerGroup beerGroup;

}
