package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString
public class Review {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reviewNo;

    @ManyToOne
    @JoinColumn(name="user_no")
    private User user;

    @ManyToOne
    @JoinColumn(name="beer_no")
    private Beer beer;

    private Double reviewTaste;

    private Double reviewAroma;

    private Integer reviewRank;

    @Lob
    private String reviewContent;
}
