package com.bigdata.buur.search.service;

import com.bigdata.buur.customException.UserNotFoundException;
import com.bigdata.buur.entity.SearchHistory;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.search.repository.SearchRepository;
import com.bigdata.buur.search.dto.SearchHistoryDto;
import com.bigdata.buur.user.repository.UserRepository;
import com.bigdata.buur.user.service.UserService;
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
    public String saveSearchHistory(SearchHistoryDto searchHistoryDto) {

        User user = userRepository.findById(userService.currentUser()).orElseThrow(UserNotFoundException::new);

        // 기존에 동일한 검색 내역이 있는 경우 조회 후 삭제
        List<SearchHistory> existSearchHistory = searchRepository.findAllByKeyword(searchHistoryDto.getKeyword());
        if(!existSearchHistory.isEmpty()) {
            for (SearchHistory searchHistory : existSearchHistory) {
                if(searchHistory.getUser().getId() == user.getId())
                    searchRepository.delete(searchHistory);
            }
        }
        // 검색 내역 저장
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
    @Transactional
    public List<SearchHistoryDto> findSearchHistoryList() {

        Long id = userService.currentUser();
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        List<SearchHistory> searchHistoryList = searchRepository.findTop5ByUserOrderByIdDesc(user);
        List<SearchHistoryDto> searchHistoryDtoList = new ArrayList<>();

        for (SearchHistory searchHistory : searchHistoryList) {
                searchHistoryDtoList.add(SearchHistoryDto.builder()
                        .searchId(searchHistory.getId())
                        .userNo(id)
                        .keyword(searchHistory.getKeyword())
                        .build());
        }

        return searchHistoryDtoList;
    }

    @Override
    @Transactional
    public void removeSearchHistory(Long search_id) {

        SearchHistory searchHistory = searchRepository.findById(search_id).orElseThrow(null);

        searchRepository.delete(searchHistory);
    }
}
