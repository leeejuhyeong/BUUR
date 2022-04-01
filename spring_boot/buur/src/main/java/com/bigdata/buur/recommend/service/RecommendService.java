package com.bigdata.buur.recommend.service;

import com.bigdata.buur.recommend.dto.RecommendDto;

import java.util.List;


public interface RecommendService {
    List<RecommendDto> findRecommendBeerList();
}
