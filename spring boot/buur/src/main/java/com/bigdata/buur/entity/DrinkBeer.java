package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString
public class DrinkBeer {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long recordNo;

    @ManyToOne
    @JoinColumn(name = "beer_no")
    private Beer beer;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;

    private LocalDate recordDt;


}
