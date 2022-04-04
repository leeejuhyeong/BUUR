package com.bigdata.buur.user.service;

import com.bigdata.buur.user.dto.ModifyUserDto;
import com.bigdata.buur.user.dto.SafeUserDto;
import com.bigdata.buur.user.dto.SurveyDto;
import com.bigdata.buur.user.dto.UserDto;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@Service
public interface UserService {

    public boolean checkIdDuplicate(String userId);
    public boolean checkNicknameDuplicate(String userNickname);
    public String findUserStatus();
    public User addUser(UserDto user);
    public String login(UserDto user);
    public List<Review> surveyAdd(List<SurveyDto> surveyDtoList);
    public Long currentUser();
    public SafeUserDto findUserInfo() throws IOException;
    public void modifyUserProfile(MultipartFile userProfile) throws IOException;
    public void modifyPassword(ModifyUserDto modifyUserDto);


}
