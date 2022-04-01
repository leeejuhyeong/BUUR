package com.bigdata.buur.recommend.controller;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.recommend.dto.RecommendDto;
import com.bigdata.buur.recommend.service.RecommendService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
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
    public ResponseEntity<List<RecommendDto>> recommendBeerList() throws IOException {
        List<RecommendDto> recommendBeerList = recommendService.findRecommendBeerList();
        for (RecommendDto recommend : recommendBeerList) {
            InputStream inputStream = new FileInputStream(recommend.getBeer_image());
            recommend.setBeerImage(IOUtils.toByteArray(inputStream));
        }
        return ResponseEntity.ok().body(recommendBeerList);
    }

    @ApiOperation(value = "비슷한 맥주 조회")
    @GetMapping("/similar/{beer_id}")
    public ResponseEntity<List<RecommendDto>> similarBeerList(@PathVariable("beer_id") @ApiParam("맥주 번호") Long id) throws IOException {
        List<RecommendDto> similarBeerList = recommendService.findSimilarBeerList(id);
        for (RecommendDto recommend : similarBeerList) {
            InputStream inputStream = new FileInputStream(recommend.getBeer_image());
            recommend.setBeerImage(IOUtils.toByteArray(inputStream));
        }
        return ResponseEntity.ok().body(similarBeerList);
    }
}
