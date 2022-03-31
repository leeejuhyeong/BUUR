package com.bigdata.buur.beer.controller;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.beer.service.BeerService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RequiredArgsConstructor
@RequestMapping("/api-v1/beer")
@Slf4j
public class BeerController {

    private final BeerService beerService;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @ApiOperation(value = "종류별 맥주 조회")
    @GetMapping("/{type}/{offset}")
    public ResponseEntity<List<BeerDto.LikeBeer>> beerList(
            @PathVariable("type") @ApiParam(value = "맥주 종류(ALL, LAGER, ALE, BLACK_BEER, PILSNER, WHEAT_BEER, ETC") String type,
            @PathVariable("offset") @ApiParam(value = "오프셋, 0부터 시작") int offset) {
        List<BeerDto.LikeBeer> likeBeerList = beerService.findBeerList(type, offset);

        InputStream inputStream;
        for (BeerDto.LikeBeer likeBeer : likeBeerList) {
            try {
                inputStream = new FileInputStream(likeBeer.getImagePath());
                likeBeer.addImage(inputStream);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(likeBeerList);
    }

    @ApiOperation(value = "맥주 상세 조회")
    @GetMapping("/info/{beer_id}")
    public ResponseEntity<BeerDto.Details> beerDetails(@PathVariable("beer_id") @ApiParam("맥주 번호") Long id) {
        BeerDto.Details details = beerService.findBeer(id);
        try {
            InputStream inputStream = new FileInputStream(details.getImagePath());
            details.setBeerImage(IOUtils.toByteArray(inputStream));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(details);
    }

    @ApiOperation(value = "맥주 좋아요 추가")
    @PostMapping("/like/{beer_id}")
    public ResponseEntity<String> likesAdd(@PathVariable("beer_id") @ApiParam("맥주 번호") Long id) {
        beerService.addLikes(id);
        return ResponseEntity.ok(SUCCESS);
    }

    @ApiOperation(value = "맥주 좋아요 취소")
    @DeleteMapping("/like/{beer_id}")
    public ResponseEntity<String> likesRemove(@PathVariable("beer_id") @ApiParam("맥주 번호") Long id) {
        beerService.removeLikes(id);
        return ResponseEntity.ok(SUCCESS);
    }

    @ApiOperation(value = "좋아요 맥주 조회")
    @GetMapping("/like")
    public ResponseEntity<List<BeerDto.LikeBeer>> likesList() {
        return ResponseEntity.ok(beerService.findLikeBeerList());
    }
}