package com.bigdata.buur.user.service;

import com.bigdata.buur.customException.UserAuthExpiredException;
import com.bigdata.buur.customException.UserNotFoundException;
import com.bigdata.buur.customException.UserPasswordMismatchException;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.user.dto.ModifyUserDto;
import com.bigdata.buur.user.dto.SafeUserDto;
import com.bigdata.buur.user.dto.SurveyDto;
import com.bigdata.buur.user.dto.UserDto;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.enums.UserRole;
import com.bigdata.buur.enums.UserStatus;
import com.bigdata.buur.review.repository.ReviewRepository;
import com.bigdata.buur.user.repository.UserRepository;
import com.bigdata.buur.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
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
        return userRepository.existsByNickname(userNickname);
    }

    @Override
    public String findUserStatus() {
        User user = userRepository.findById(currentUser())
                .orElseThrow(UserNotFoundException::new);

        return user.getUserStatus().toString();
    }


    @Override
    public User addUser(UserDto user) {

        return userRepository.save(User.builder()
                .userId(user.getUserId())
                .password(passwordEncoder.encode(user.getUserPassword()))
                .nickname(user.getUserNickname())
                .email(user.getUserEmail())
                .userStatus(UserStatus.valueOf("NEW_USER"))
                .userRole(UserRole.valueOf("ROLE_USER"))
                .build());
    }

    @Override
    public String login(UserDto user) {
        User findUser = userRepository.findByUserId(user.getUserId())
                .orElseThrow(UserNotFoundException::new);
        if (!passwordEncoder.matches(user.getUserPassword(), findUser.getPassword())) {
            throw new UserPasswordMismatchException();
        }

        // 토큰 return
        return jwtTokenProvider.createToken(findUser.getUserId(), findUser.getUserStatus().toString());
    }

    @Override
    @Transactional
    public List<Review> surveyAdd(List<SurveyDto> surveyDtoList) {

        List<Review> reviewList = new ArrayList<Review>();

        User currentUser = userRepository.findById(currentUser())
                .orElseThrow(UserNotFoundException::new);


        for (SurveyDto surveyDto : surveyDtoList) {
            reviewList.add(Review.builder()
                    .user(currentUser)
                    .beer(Beer.builder().id(surveyDto.getBeerNo()).build())
                    .totalScore(surveyDto.getRank())
                    .content(surveyDto.getContent())
                    .build());
        }

        // 신규회원이 설문을 마쳤으므로 기존 회원으로 상태를 변경
        currentUser.changeUserStatus();
        userRepository.save(currentUser);

        return reviewRepository.saveAll(reviewList);
    }

    @Override
    @Transactional
    public void modifyUserProfile(MultipartFile userProfile) throws IOException {
        User user = userRepository.findById(currentUser())
                .orElseThrow(UserNotFoundException::new);

        // 파일 처리 & DB에 경로 저장
        if (userProfile != null) {
            // 로컬 환경 기준
            final String UPLOAD_PATH = System.getProperty("user.dir").concat("/images/profiles").replace("/", File.separator);

//            System.out.println(UPLOAD_PATH);
            // Ubuntu Server 기준
//            final String UPLOAD_PATH = "/home/ubuntu/buur/image/profile/"
//                    .replace("/", File.separator);

            File folder = new File(UPLOAD_PATH);

            if (!folder.exists()) folder.mkdirs();

            String fileExtension = userProfile.getOriginalFilename().split("\\.")[1];

            final String userProfileName = user.getUserId() + "." + fileExtension;


            File profile = new File(folder, userProfileName);

            if (profile.exists()) profile.delete();

            userProfile.transferTo(profile);

            user.changeProfile(folder, userProfileName);
            userRepository.save(user);
        }
    }

    @Override
    @Transactional
    public void modifyPassword(ModifyUserDto modifyUserDto) throws UserPasswordMismatchException {
        User user = userRepository.findById(currentUser())
                .orElseThrow(UserNotFoundException::new);

        if (passwordEncoder.matches(modifyUserDto.getOriginPassword(), user.getPassword())) {
            user.changePassword(passwordEncoder.encode(modifyUserDto.getNewPassword()));
        } else {
            throw new UserPasswordMismatchException();
        }

        System.out.println("저장 성공");
        userRepository.save(user);
    }

    @Override
    @Transactional
    public Long currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) throw new UserAuthExpiredException();

        User user = (User) authentication.getPrincipal();
        return user.getId();
    }

    @Override
    public SafeUserDto findUserInfo() throws IOException {
        User user = userRepository.findById(currentUser())
                .orElseThrow(UserNotFoundException::new);


        InputStream userProfileImage = new FileInputStream(user.getProfile());


        return SafeUserDto.builder()
                .userId(user.getUserId())
                .userNickname(user.getNickname())
                .userEmail(user.getEmail())
                .userDrink(user.getDrink())
                .userProfile(IOUtils.toByteArray(userProfileImage))
                .build();
    }
}
