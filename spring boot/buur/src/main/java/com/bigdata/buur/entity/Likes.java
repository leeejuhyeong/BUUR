package com.bigdata.buur.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Likes")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString
public class Likes {

    @EmbeddedId
    private LikesID likesID;


}
