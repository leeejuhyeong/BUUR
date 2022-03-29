package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="id")
    private User user;

    @ManyToOne
    @JoinColumn(name="beer_id")
    private Beer beer;

    private Double taste;

    private Double aroma;

    private Integer totalScore;

    @Lob
    private String content;
}
