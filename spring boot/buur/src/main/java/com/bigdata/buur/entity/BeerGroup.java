package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter @Setter @ToString
public class BeerGroup {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long groupNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;


}
