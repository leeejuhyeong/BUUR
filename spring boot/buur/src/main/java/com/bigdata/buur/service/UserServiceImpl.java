package com.bigdata.buur.service;

import com.bigdata.buur.dto.UserDto;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.enums.UserRole;
import com.bigdata.buur.enums.UserStatus;
import com.bigdata.buur.repository.UserRepository;
import com.bigdata.buur.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @Override
    public boolean checkIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    @Override
    public boolean checkNicknameDuplicate(String user_nickname) {
        return userRepository.existsByUserNickname(user_nickname);
    }

    @Override
    public String addUser(UserDto user){

        if(user == null) return FAIL;

        if(userRepository.save(User.builder()
                .userId(user.getUserId())
                .userPassword(passwordEncoder.encode(user.getUserPassword()))
                .userNickname(user.getUserNickname())
                .userEmail(user.getUserEmail())
                .userStatus(UserStatus.valueOf("NEW_USER"))
                .userRole(UserRole.valueOf("ROLE_USER"))
                .build()) != null)
            return SUCCESS;
        else return FAIL;
    }

    @Override
    public String login(UserDto user) {
        User findUser = userRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 사용자 입니다."));
        if (!passwordEncoder.matches(user.getUserPassword(), findUser.getUserPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        // 토큰 return
        return jwtTokenProvider.createToken(findUser.getUserId(), findUser.getUserStatus().toString());

    }

    @Override
    @Transactional
    public Long currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getUserNo();
    }

}
