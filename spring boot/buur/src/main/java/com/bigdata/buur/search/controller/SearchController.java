package com.bigdata.buur.search.controller;

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
    public ResponseEntity<String> searchHistoryAdd(@RequestBody SearchHistoryDto searchHistory) {
        return ResponseEntity.ok().body(searchService.addSearchHistory(searchHistory));
    }

    // 검색 기록 조회
    @GetMapping("/search")
    public ResponseEntity<List<SearchHistoryDto>> searchHistoryList() {
        return ResponseEntity.ok().body(searchService.findSearchHistoryList());
    }

}
