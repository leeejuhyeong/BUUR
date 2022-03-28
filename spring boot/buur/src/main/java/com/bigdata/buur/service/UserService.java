package com.bigdata.buur.service;

import com.bigdata.buur.dto.SurveyDto;
import com.bigdata.buur.dto.UserDto;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public boolean checkIdDuplicate(String userId);
    public boolean checkNicknameDuplicate(String userNickname);
    public String findUserStatus(String userId);
    public User addUser(UserDto user);
    public String login(UserDto user);
    public List<Review> surveyAdd(List<SurveyDto> surveyDtoList);

}
