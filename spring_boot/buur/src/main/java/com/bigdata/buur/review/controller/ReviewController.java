package com.bigdata.buur.review.controller;

import com.bigdata.buur.review.dto.ReviewDto;
import com.bigdata.buur.review.dto.ReviewResDto;
import com.bigdata.buur.review.service.ReviewService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api-v1/beer/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // 맥주 리스트를 10개씩 가져오기
    @ApiOperation(value = "맥주 리뷰 가져오기 (10개씩)")
    @GetMapping("/{beer_id}/{cursor}")
    public ResponseEntity<List<ReviewResDto>> getReviewList(@PathVariable @ApiParam(value = "리뷰를 가져올 맥주 번호") Long beer_id,
                                                            @PathVariable @ApiParam(value = "가져올 리뷰의 시간값 (없을 시 현재 시간을 넣어야 함.)")
                                                            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime cursor){
        return ResponseEntity.ok().body(reviewService.findReviews(beer_id, cursor));
    }

    @ApiOperation(value = "리뷰 저장")
    @PostMapping()
    public ResponseEntity<?> reviewAdd(@RequestBody @ApiParam(value = "저장할 리뷰 정보") ReviewDto reviewDto) {

        reviewService.addReview(reviewDto);
        return ResponseEntity.ok().body("저장에 성공하였습니다.");
    }

    @ApiOperation(value = "리뷰 삭제")
    @DeleteMapping("/{review_id}")
    public ResponseEntity<?> reviewRemove(@PathVariable @ApiParam(value = "삭제할 리뷰 번호") Long review_id) {

        reviewService.removeReview(review_id);

        return ResponseEntity.ok().body("삭제에 성공하였습니다.");

    }
}
