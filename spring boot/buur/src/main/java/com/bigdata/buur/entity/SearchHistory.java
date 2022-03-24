package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString
public class SearchHistory {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long searchNo;

    @OneToOne
    @JoinColumn(name = "beer_no")
    private Beer beer;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;


}
