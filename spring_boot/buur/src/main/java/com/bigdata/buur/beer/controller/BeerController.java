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

    @ApiOperation(value = "맥주 전체 조회")
    @GetMapping
    public ResponseEntity<List<BeerDto.CommonBeer>> beerList() throws IOException{
        List<BeerDto.CommonBeer> commonBeerList = beerService.findBearList();

        InputStream inputStream;
        for (BeerDto.CommonBeer commonBeer : commonBeerList) {
            inputStream = new FileInputStream(commonBeer.getImagePath());
            commonBeer.setBeerImage(IOUtils.toByteArray(inputStream));
        }
        return ResponseEntity.ok().body(commonBeerList);
    }

    @ApiOperation(value = "종류별 맥주 조회")
    @GetMapping("/{type}/{offset}")
    public ResponseEntity<List<BeerDto.LikeBeer>> beerTypeList(
            @PathVariable("type") @ApiParam(value = "맥주 종류(ALL, LAGER, ALE, BLACK_BEER, PILSNER, WHEAT_BEER, ETC") String type,
            @PathVariable("offset") @ApiParam(value = "오프셋, 0부터 시작") int offset) throws IOException{
        List<BeerDto.LikeBeer> likeBeerList = beerService.findBeerList(type, offset);

        InputStream inputStream;
        for (BeerDto.LikeBeer likeBeer : likeBeerList) {
            inputStream = new FileInputStream(likeBeer.getImagePath());
            likeBeer.setBeerImage(IOUtils.toByteArray(inputStream));
        }
        return ResponseEntity.ok().body(likeBeerList);
    }

    @ApiOperation(value = "맥주 상세 조회")
    @GetMapping("/info/{beer_id}")
    public ResponseEntity<BeerDto.Details> beerDetails(@PathVariable("beer_id") @ApiParam("맥주 번호") Long id) throws IOException {
        BeerDto.Details details = beerService.findBeer(id);
        InputStream inputStream = new FileInputStream(details.getImagePath());
        details.setBeerImage(IOUtils.toByteArray(inputStream));
        return ResponseEntity.ok().body(details);

    }

    @ApiOperation(value = "맥주 좋아요 추가")
    @PostMapping("/like/{beer_id}")
    public ResponseEntity<String> likesAdd(@PathVariable("beer_id") @ApiParam("맥주 번호") Long id) {
        beerService.addLikes(id);
        return ResponseEntity.ok().body(SUCCESS);
    }

    @ApiOperation(value = "맥주 좋아요 취소")
    @DeleteMapping("/like/{beer_id}")
    public ResponseEntity<String> likesRemove(@PathVariable("beer_id") @ApiParam("맥주 번호") Long id) {
        beerService.removeLikes(id);
        return ResponseEntity.ok().body(SUCCESS);
    }

    @ApiOperation(value = "좋아요 맥주 조회")
    @GetMapping("/like")
    public ResponseEntity<List<BeerDto.LikeBeer>> likesList() throws IOException {
        List<BeerDto.LikeBeer> likeBeerList = beerService.findLikeBeerList();
        InputStream inputStream;
        for (BeerDto.LikeBeer likeBeer : likeBeerList) {
            inputStream = new FileInputStream(likeBeer.getImagePath());
            likeBeer.setBeerImage(IOUtils.toByteArray(inputStream));
        }
        return ResponseEntity.ok().body(likeBeerList);
    }

    @ApiOperation(value = "맥주 검색 자동완성")
    @GetMapping("/{beer_name}")
    public ResponseEntity<List<BeerDto.LikeBeer>> searchBeerList(@PathVariable("beer_name") @ApiParam("검색 단어") String keyword) throws IOException{
        List<BeerDto.LikeBeer> searchBeerList = beerService.findSearchBeerList(keyword);

        for (BeerDto.LikeBeer likeBeer : searchBeerList) {
                InputStream inputStream = new FileInputStream(likeBeer.getImagePath());
                likeBeer.setBeerImage(IOUtils.toByteArray(inputStream));
        }

        return ResponseEntity.ok().body(searchBeerList);
    }
}