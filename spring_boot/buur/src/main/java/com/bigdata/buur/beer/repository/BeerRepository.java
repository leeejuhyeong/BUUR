package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.enums.BeerCategory;

import java.util.List;

public interface BeerRepository {
    // 맥주 전체 조회
    List<Beer> findAll();
    // 종류별 맥주 조회
    List<Beer> findAllByTypeAndOffset(BeerCategory beerCategory, int offset);
    // 맥주 조회
    List<Beer> findAllByOffset(int offset);
    // 맥주 상세정보 조회
    Beer findById(Long id);
    // 맥주 검색 자동완성
    List<Beer> findAllByNameContainingOrEngNameContaining(String keyword);
    // 맥주 이름 자동완성
    List<String> findNameByNameContainingOrEngNameContaining(String keyword);
}