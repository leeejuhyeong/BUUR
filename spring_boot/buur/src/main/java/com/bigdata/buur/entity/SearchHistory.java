package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchHistory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "search_id")
    private Long id;

    private String keyword;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;


}
