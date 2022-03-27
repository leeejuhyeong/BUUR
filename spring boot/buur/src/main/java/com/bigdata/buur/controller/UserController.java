package com.bigdata.buur.controller;

import com.bigdata.buur.enums.UserRole;
import com.bigdata.buur.enums.UserStatus;
import com.bigdata.buur.service.UserService;
import com.bigdata.buur.util.JwtTokenProvider;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    // 아이디 중복 체크
    @GetMapping("/id-check/{user_id}")
    public ResponseEntity<Boolean> checkIdDuplicate (@PathVariable String user_id){
        return ResponseEntity.ok(userService.checkIdDuplicate(user_id));
    }

    // 닉네임 중복 체크
    @GetMapping("/name-check/{user_nickname}")
    public ResponseEntity<Boolean> checkNicknameDuplicate (@PathVariable String user_nickname){
        return ResponseEntity.ok(userService.checkNicknameDuplicate(user_nickname));
    }

    // 이메일 인증 번호 전송 /email


    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        User signupUser = userRepository.save(User.builder()
                .userId(user.getUserId())
                .userPassword(passwordEncoder.encode(user.getUserPassword()))
                .userNickname(user.getUserNickname())
                .userEmail(user.getUserEmail())
                .userStatus(UserStatus.valueOf("NEW_USER"))
                .userRole(UserRole.valueOf("ROLE_USER"))
                .build());

        if(signupUser != null)
            return ResponseEntity.ok().body(SUCCESS);
        return ResponseEntity.ok().body(FAIL);
    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User findUser = userRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 사용자 입니다."));
        if (!passwordEncoder.matches(user.getUserPassword(), findUser.getUserPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        // 토큰 return
        return jwtTokenProvider.createToken(findUser.getUserId(), findUser.getUserStatus().toString());
    }

    @GetMapping("/test")
    public String testSecurity() {
        return "test";
    }

}
