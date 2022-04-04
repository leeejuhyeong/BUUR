package com.bigdata.buur.beer.service;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.enums.BeerCategory;

import java.util.List;

public interface BeerService {
    // 맥주 전체 조회
    List<BeerDto.CommonBeer> findBearList();
    // 종류별 맥주 조회
    List<BeerDto.LikeBeer> findBeerList(String type, int offset);
    // 맥주 상세 조회
    BeerDto.Details findBeer(Long id);
    // 좋아요 추가
    void addLikes(Long id);
    // 좋아요 삭제
    void removeLikes(Long id);
    // 좋아요한 맥주 조회
    List<BeerDto.LikeBeer> findLikeBeerList();
    // 맥주 자동완성 검색
    List<BeerDto.LikeBeer> findSearchBeerList(String keyword);
}
