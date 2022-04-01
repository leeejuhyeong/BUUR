package com.bigdata.buur.recommend.controller;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.recommend.dto.RecommendDto;
import com.bigdata.buur.recommend.service.RecommendService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("api-v1/beer")
public class RecommendController {

    private final RecommendService recommendService;

    @ApiOperation(value = "맥주 추천")
    @GetMapping("/new")
    public ResponseEntity<List<RecommendDto>> recommendBeerList() {
        List<RecommendDto> recommends = recommendService.findRecommendBeerList();
        for (RecommendDto recommend : recommends) {
            try {
                InputStream inputStream = new FileInputStream(recommend.getBeer_image());
                recommend.setBeerImage(IOUtils.toByteArray(inputStream));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok().body(recommends);
    }
}
