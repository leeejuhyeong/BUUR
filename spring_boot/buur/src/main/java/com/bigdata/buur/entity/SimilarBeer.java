package com.bigdata.buur.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimilarBeer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "similar_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origin")
    private Beer origin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "similar")
    private Beer similar;

    private Double score;
}
