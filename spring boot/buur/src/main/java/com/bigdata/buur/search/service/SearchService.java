package com.bigdata.buur.search.service;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.search.dto.SearchHistoryDto;

import java.util.List;

public interface SearchService {

    public String saveSearchHistory(SearchHistoryDto searchHistoryDto);
    public List<SearchHistoryDto> findSearchHistoryList();
    public String removeSearchHistory(Long search_id);
//    public List<BeerDto> findSearchBeerList(String beer_name);

}
