package com.bigdata.buur.service;

import com.bigdata.buur.dto.SurveyDto;
import com.bigdata.buur.dto.UserDto;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.enums.UserRole;
import com.bigdata.buur.enums.UserStatus;
import com.bigdata.buur.repository.ReviewRepository;
import com.bigdata.buur.repository.UserRepository;
import com.bigdata.buur.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @Override
    public boolean checkIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    @Override
    public boolean checkNicknameDuplicate(String userNickname) {
        return userRepository.existsByUserNickname(userNickname);
    }

    @Override
    public String findUserStatus(String userId) {

        User user = userRepository.findByUserId(userId).get();

        if (user == null)
            return FAIL;
        else return user.getUserStatus().toString();
    }


    @Override
    public User addUser(UserDto user){

        return userRepository.save(User.builder()
                .userId(user.getUserId())
                .userPassword(passwordEncoder.encode(user.getUserPassword()))
                .userNickname(user.getUserNickname())
                .userEmail(user.getUserEmail())
                .userStatus(UserStatus.valueOf("NEW_USER"))
                .userRole(UserRole.valueOf("ROLE_USER"))
                .build());
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
    public List<Review> surveyAdd(List<SurveyDto> surveyDtoList) {

        List<Review> reviewList = new ArrayList<Review>();

        for (SurveyDto surveyDto : surveyDtoList) {
//            reviewList.add()
        }


        return null;
    }


}
