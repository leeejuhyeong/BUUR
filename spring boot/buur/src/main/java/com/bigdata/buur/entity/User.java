package com.bigdata.buur.entity;

import com.bigdata.buur.enums.UserRole;
import com.bigdata.buur.enums.UserStatus;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter @Setter @ToString
public class User implements UserDetails{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long userNo;

    @Column(unique = true)
    private String userId;

    private String userNickname;

    private String userEmail;

    private String userProfile;

    private String userPassword;

    private Integer userDrink;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @OneToMany(mappedBy = "user")
    private List<BeerGroup> groupsList = new ArrayList<BeerGroup>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        grantedAuthorities.add(userRole);

        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
