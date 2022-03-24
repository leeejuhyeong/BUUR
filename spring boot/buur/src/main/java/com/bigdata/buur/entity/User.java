package com.bigdata.buur.entity;

import com.bigdata.buur.enums.UserStatus;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
//@AllArgsConstructor
@Getter @Setter @ToString
public class User {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_no")
    private Long userNo;

    private String userId;

    private String userNickname;

    private String userEmail;

    private String userProfile;

    private String userPassword;

    private Integer userDrink;

    @OneToMany(mappedBy = "user")
    private List<BeerGroup> groupsList = new ArrayList<BeerGroup>();


    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

}
