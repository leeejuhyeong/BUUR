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

    @ManyToOne
    @JoinColumn(name="user_no")
    private User user;

    @ManyToOne
    @JoinColumn(name="beer_no")
    private Beer beer;



}
