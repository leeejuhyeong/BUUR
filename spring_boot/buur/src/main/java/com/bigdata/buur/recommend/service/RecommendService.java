package com.bigdata.buur.recommend.service;

import com.bigdata.buur.recommend.dto.RecommendDto;

import java.net.ConnectException;
import java.util.List;


public interface RecommendService {
    List<RecommendDto> findRecommendBeerList() throws ConnectException;
    List<RecommendDto> findSimilarBeerList(Long id);
}
