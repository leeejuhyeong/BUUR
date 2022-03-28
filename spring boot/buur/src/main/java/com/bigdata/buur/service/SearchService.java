package com.bigdata.buur.service;

import com.bigdata.buur.dto.SearchHistoryDto;
import com.bigdata.buur.entity.SearchHistory;

import java.util.List;

public interface SearchService {

    public String addSearchHistory(SearchHistoryDto searchHistoryDto);
    public List<SearchHistoryDto> findSearchHistoryList();

}
