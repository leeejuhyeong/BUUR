package com.bigdata.buur.search.service;

import com.bigdata.buur.search.dto.SearchHistoryDto;

import java.util.List;

public interface SearchService {

    public String saveSearchHistory(SearchHistoryDto searchHistoryDto);
    public List<SearchHistoryDto> findSearchHistoryList();
    public void removeSearchHistory(Long search_id);
}
