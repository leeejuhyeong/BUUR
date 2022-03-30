package com.bigdata.buur.search.controller;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.search.dto.SearchHistoryDto;
import com.bigdata.buur.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api-v1/beer")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    // 검색 기록 저장
    @PostMapping("/search")
    public ResponseEntity<String> searchHistorySave(@RequestBody SearchHistoryDto searchHistory) {
        return ResponseEntity.ok().body(searchService.saveSearchHistory(searchHistory));
    }

    // 검색 기록 조회
    @GetMapping("/search")
    public ResponseEntity<List<SearchHistoryDto>> searchHistoryList() {
        return ResponseEntity.ok().body(searchService.findSearchHistoryList());
    }

    // 검색 기록 삭제
    @DeleteMapping("/search/{search_id}")
    public ResponseEntity<String> searchHistoryRemove(@PathVariable Long search_id) {
        return ResponseEntity.ok().body(searchService.removeSearchHistory(search_id));
    }

    // 맥주 이름 검색 /beer/{beer_name}
    @GetMapping("/beer/{beer_name}")
    public ResponseEntity<List<BeerDto>> searchBeerList(@PathVariable String beer_name) {
        return ResponseEntity.ok().body(searchService.findSearchBeerList(beer_name));
    }

}
