package com.bigdata.buur.controller;

import com.bigdata.buur.dto.UserDto;
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

@RestController
@CrossOrigin("*")
@RequestMapping("/api-v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

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
    public ResponseEntity<String> signup(@RequestBody UserDto user) {
        return ResponseEntity.ok().body(userService.addUser(user));
    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody UserDto user) {
        return userService.login(user);
    }

    // 신규회원 체크
    @GetMapping("/user/status/{user_id}")
    public String userStatusDetails(@PathVariable String user_id) {

        return null;
    }

    @Deprecated
    @GetMapping("/test")
    public String testSecurity() {
        return "test";
    }

}
