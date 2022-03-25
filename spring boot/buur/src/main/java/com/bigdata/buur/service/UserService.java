package com.bigdata.buur.service;

import com.bigdata.buur.repository.UserRepository;
import com.bigdata.buur.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    public boolean checkIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    public boolean checkNicknameDuplicate(String user_nickname) {
        return userRepository.existsByUserNickname(user_nickname);
    }

    @Override
    public User loadUserByUsername(String id) throws UsernameNotFoundException {
        return userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
    }



}
