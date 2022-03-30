package com.bigdata.buur.review.controller;

import com.bigdata.buur.review.dto.ReviewDto;
import com.bigdata.buur.review.dto.ReviewResDto;
import com.bigdata.buur.review.service.ReviewService;
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

    @GetMapping("/{beer_id}/{cursor}")
    public ResponseEntity<List<ReviewResDto>> getReviewList(@PathVariable Long beer_id,
                                                            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime cursor){
        return ResponseEntity.ok().body(reviewService.findReviews(beer_id, cursor));
    }

    @PostMapping()
    public ResponseEntity<?> reviewAdd(@RequestBody ReviewDto reviewDto) {

        if (reviewService.addReview(reviewDto))
            return ResponseEntity.ok().body(null);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("데이터를 저장하지 못했습니다.");
    }

    @DeleteMapping("/{review_id}")
    public ResponseEntity<?> reviewRemove(@PathVariable Long review_id) {

        if(reviewService.removeReview(review_id))
            return ResponseEntity.ok().body(null);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("데이터를 삭제하지 못했습니다.");

    }
}
