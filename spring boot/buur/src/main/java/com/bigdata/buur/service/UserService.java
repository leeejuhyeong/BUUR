package com.bigdata.buur.service;

import com.bigdata.buur.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public boolean checkIdDuplicate(String userId);
    public boolean checkNicknameDuplicate(String user_nickname);
    public String addUser(UserDto user);
    public String login(UserDto user);

    public Long currentUser();

}
