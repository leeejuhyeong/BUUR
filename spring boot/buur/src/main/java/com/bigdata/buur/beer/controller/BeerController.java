package com.bigdata.buur.beer.controller;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.beer.service.BeerService;
import com.bigdata.buur.enums.BeerCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{type}/{offset}")
    public ResponseEntity<List<BeerDto.LikeBeer>> beerList(@PathVariable(name = "type", required = false) String type, @PathVariable("offset") int offset) {
        return ResponseEntity.ok(beerService.findBeerList(type, offset));
    }

}
