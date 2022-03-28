package com.bigdata.buur.service;

import com.bigdata.buur.dto.SearchHistoryDto;
import com.bigdata.buur.entity.SearchHistory;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.repository.SearchRepository;
import com.bigdata.buur.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final SearchRepository searchRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @Override
    @Transactional
    public String addSearchHistory(SearchHistoryDto searchHistoryDto) {

        User user = userRepository.findById(userService.currentUser()).orElseThrow(null);
        SearchHistory searchHistory = searchRepository.save(SearchHistory.builder()
                .user(user)
                .keyword(searchHistoryDto.getKeyword())
                .build());

        if(user == null || searchHistory == null)
            return FAIL;
        else
            return SUCCESS;
    }

    @Override
    public List<SearchHistoryDto> findSearchHistoryList() {

        Long userNo = userService.currentUser();
        User user = userRepository.findById(userNo).orElseThrow(null);;
        List<SearchHistory> searchHistoryList = searchRepository.findTop5ByUserOrderBySearchNoDesc(user);
        List<SearchHistoryDto> searchHistoryDtoList = new ArrayList<>();

        for (SearchHistory searchHistory : searchHistoryList) {
            if(searchHistory.getUser().getUserNo() == userNo) {
                searchHistoryDtoList.add(SearchHistoryDto.builder()
                        .userNo(userNo)
                        .keyword(searchHistory.getKeyword())
                        .build());
            }
        }

        return searchHistoryDtoList;
    }
}
