package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Likes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Likes {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likesNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="beer_no")
    private Beer beer;



}
