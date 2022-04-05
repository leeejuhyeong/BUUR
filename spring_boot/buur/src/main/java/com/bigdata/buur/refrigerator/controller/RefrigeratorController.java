package com.bigdata.buur.refrigerator.controller;

import com.bigdata.buur.refrigerator.dto.BasketDto;
import com.bigdata.buur.refrigerator.dto.RefrigeratorDto;
import com.bigdata.buur.refrigerator.service.RefrigeratorService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api-v1/basket")
@RequiredArgsConstructor
public class RefrigeratorController {

    private final RefrigeratorService refrigeratorService;

    @ApiOperation(value = "맥주 조합 저장")
    @PostMapping()
    public ResponseEntity<String> refrigeratorAdd(@RequestBody @ApiParam(value = "맥주 조합 정보") List<BasketDto> basketDtoList) {
        return ResponseEntity.ok().body(refrigeratorService.addRefrigerator(basketDtoList));
    }

    @ApiOperation(value = "맥주 조합 조회")
    @GetMapping("/{page}")
    public ResponseEntity<List<BasketDto>> refrigeratorList(@PathVariable @ApiParam(value = "페이지 번호, 0부터 시작") int page) throws IOException{
        List<BasketDto> basketDtoList = refrigeratorService.findRefrigeratorList(page);

//        InputStream inputStream;
//        for (BasketDto basketDto : basketDtoList) {
//            inputStream = new FileInputStream(basketDto.getImagePath());
//            basketDto.addImage(inputStream);
//        }
        return ResponseEntity.ok().body(basketDtoList);
    }

    @ApiOperation(value = "맥주 조합 전체 페이지 수 조회 (0부터 시작)")
    @GetMapping()
    public ResponseEntity<Integer> refrigeratorTotalPage() {
        return ResponseEntity.ok().body(refrigeratorService.findRefrigeratorTotalPage());
    }

    @ApiOperation(value = "맥주 조합 삭제")
    @DeleteMapping("/{group_id}")
    public ResponseEntity<String> refrigeratorRemove(@PathVariable @ApiParam(value = "그룹 번호") int group_id) {
        return ResponseEntity.ok().body(refrigeratorService.removeRefrigerator(group_id));
    }

    @ApiOperation(value = "사용자가 많이 마신 맥주 순으로 조회")
    @GetMapping("/drink/{page}")
    public ResponseEntity<List<RefrigeratorDto>> userRefrigeratorList(@PathVariable @ApiParam(value = "페이지 번호, 0부터 시작") int page) throws IOException {
        List<RefrigeratorDto> refrigeratorDtoList = refrigeratorService.findUserRefrigeratorList(page);

        InputStream inputStream;
        for (RefrigeratorDto refrigeratorDto : refrigeratorDtoList) {
            inputStream = new FileInputStream(refrigeratorDto.getImagePath());
            refrigeratorDto.addImage(inputStream);
        }
        return ResponseEntity.ok().body(refrigeratorDtoList);
    }

    @ApiOperation(value = "사용자가 많이 마신 맥주 전체 페이지 수 조회 (0부터 시작)")
    @GetMapping("/drink")
    public ResponseEntity<Integer> userRefrigeratorTotalPage() {
        return ResponseEntity.ok().body(refrigeratorService.findUserRefrigeratorTotalPage());
    }
}
