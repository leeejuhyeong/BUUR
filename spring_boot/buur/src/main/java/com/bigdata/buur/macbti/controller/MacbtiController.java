package com.bigdata.buur.macbti.controller;

import com.bigdata.buur.macbti.dto.DrinkBeerDto;
import com.bigdata.buur.macbti.service.MacbtiService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api-v1/beer")
@RequiredArgsConstructor
public class MacbtiController {

    private final MacbtiService macbtiService;

    @ApiOperation(value = "사용자가 마신 맥주 월별 통계")
    @GetMapping("/month")
    public ResponseEntity<List<DrinkBeerDto>> macbtiList() {
        return ResponseEntity.ok().body(macbtiService.findDrinkBeerList());
    }

}