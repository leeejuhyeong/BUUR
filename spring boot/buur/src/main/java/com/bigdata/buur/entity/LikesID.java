package com.bigdata.buur.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class LikesID implements Serializable {

    @ManyToOne
    @JoinColumn(name="user_no")
    private User user;

    @ManyToOne
    @JoinColumn(name="beer_no")
    private Beer beer;

}
