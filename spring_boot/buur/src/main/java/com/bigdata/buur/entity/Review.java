package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="beer_id")
    private Beer beer;

    private Double taste;

    private Double aroma;

    private LocalDateTime reviewDt;

    private Integer totalScore;

    @Lob
    private String content;

    @PrePersist
    public void reviewDt(){
        this.reviewDt = LocalDateTime
                .now(ZoneId.of("Asia/Seoul"));

    }

}
