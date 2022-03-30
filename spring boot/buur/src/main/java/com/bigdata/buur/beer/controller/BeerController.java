package com.bigdata.buur.beer.controller;

import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.beer.service.BeerService;
import com.bigdata.buur.enums.BeerCategory;
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

    @GetMapping("/{type}/{offset}")
    public ResponseEntity<List<BeerDto.LikeBeer>> beerList(@PathVariable(name = "type", required = false) String type, @PathVariable("offset") int offset) {
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

    @GetMapping("/info/{beer_id}")
    public ResponseEntity<BeerDto.Details> beerDetails(@PathVariable("beer_id") Long id) {
        BeerDto.Details details = beerService.findBeer(id);
        try {
            InputStream inputStream = new FileInputStream(details.getImagePath());
            details.setBeerImage(IOUtils.toByteArray(inputStream));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(details);
    }

//    @PostMapping("/like/{beer_id}")
//    public ResponseEntity<String> likesAdd(@PathVariable("beer_id") Long )

}
