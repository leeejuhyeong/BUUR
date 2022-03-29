package com.bigdata.buur.user.controller;

import com.bigdata.buur.user.dto.SafeUserDto;
import com.bigdata.buur.user.dto.SurveyDto;
import com.bigdata.buur.user.dto.UserDto;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api-v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    // 아이디 중복 체크
    @GetMapping("/id-check/{user_id}")
    public ResponseEntity<Boolean> checkIdDuplicate (@PathVariable String user_id){
        if (user_id == null) ResponseEntity.ok().body(Boolean.FALSE);
        return ResponseEntity.ok(userService.checkIdDuplicate(user_id));
    }

    // 닉네임 중복 체크
    @GetMapping("/name-check/{user_nickname}")
    public ResponseEntity<Boolean> checkNicknameDuplicate (@PathVariable String user_nickname){
        if (user_nickname == null) return ResponseEntity.ok().body(Boolean.FALSE);
        return ResponseEntity.ok(userService.checkNicknameDuplicate(user_nickname));
    }

    // 이메일 인증 번호 전송 /email


    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDto user) {
        if(user == null || userService.addUser(user) == null)
            return ResponseEntity.ok().body(FAIL);
        else
            return ResponseEntity.ok().body(SUCCESS);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto user) {

        if (user == null) return ResponseEntity.ok().body(FAIL);

        try {
            return ResponseEntity.ok().body(userService.login(user));
        }
        catch (Exception e){
            return ResponseEntity.ok().body(FAIL);
        }

    }

    // 신규회원 체크
    @GetMapping("/status")
    public ResponseEntity<String> userStatusDetails() {
        return ResponseEntity.ok().body(userService.findUserStatus());
    }
    
    // 설문조사 결과 저장
    @PostMapping("/survey")
    public ResponseEntity<String> surveyAdd(@RequestBody List<SurveyDto> surveyDtoList) {

        if (surveyDtoList.isEmpty() || userService.surveyAdd(surveyDtoList).isEmpty()) return ResponseEntity.ok().body(FAIL);

        return ResponseEntity.ok().body(SUCCESS);
    }

    @GetMapping("/info")
    public ResponseEntity<SafeUserDto> userInfoDetail() {

        try {
            return ResponseEntity.ok().body(userService.findUserInfo());
        } catch (Exception e) {
            System.out.println("정보 가져오기 실패");
            return ResponseEntity.ok().body(null);

        }


    }

    @PutMapping("/profile")
    public ResponseEntity<String> modifyProfile(@RequestPart MultipartFile userProfile) {
        try {
            userService.modifyUserProfile(userProfile);

        } catch (Exception e) {
            ResponseEntity.ok().body(FAIL);
        }
        return ResponseEntity.ok().body(SUCCESS);
    }

    @PutMapping("/password")
    public ResponseEntity<String> modifyPassword(@RequestBody String password) {
        return ResponseEntity.ok().body(userService.modifyPassword(password));
    }

    @Deprecated
    @GetMapping("/test")
    public String testSecurity() {
        return "test";
    }

}
