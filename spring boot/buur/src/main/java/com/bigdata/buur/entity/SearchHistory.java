package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SearchHistory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searchNo;

    private String keyword;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;


}
