package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Review {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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
