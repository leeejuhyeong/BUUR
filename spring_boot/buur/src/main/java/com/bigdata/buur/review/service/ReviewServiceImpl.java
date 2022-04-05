package com.bigdata.buur.review.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.customException.EntityRemoveException;
import com.bigdata.buur.customException.EntitySaveException;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.review.dto.ReviewDto;
import com.bigdata.buur.review.dto.ReviewResDto;
import com.bigdata.buur.review.repository.ReviewRepository;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final UserService userService;

    @Override
    public List<ReviewResDto> findReviews(Long beerId, LocalDateTime cursor) {

        Beer beer = Beer.builder().id(beerId).build();

        List<ReviewResDto> reviews = new ArrayList<ReviewResDto>();
        List<Review> slicedReviews;

        slicedReviews = reviewRepository.findTop10ByBeerAndReviewDtBeforeOrderByReviewDtDesc(beer, cursor);

        for (Review review : slicedReviews) {
            reviews.add(ReviewResDto
                    .builder()
                    .reviewNo(review.getId())
                    .userNickName(review.getUser().getNickname())
                    .rank(review.getTotalScore())
                    .reviewDt(review.getReviewDt())
                    .content(review.getContent())
                    .build());
        }

        return reviews;
    }

    @Override
    @Transactional
    public void addReview(ReviewDto reviewDto) {

        User currentUser = User
                .builder()
                .id(userService.currentUser())
                .build();

        Beer currentBeer = Beer
                .builder()
                .id(reviewDto.getBeerNo())
                .build();

        // 기존에 리뷰 데이터가 있는 경우 조회 후 삭제
        Review existReview = reviewRepository.findReviewByBeer_IdAndUser_Id(currentBeer.getId(), currentUser.getId());
        if(existReview != null) {
            reviewRepository.delete(existReview);
        }

        Review review = Review
                .builder()
                .user(currentUser)
                .beer(currentBeer)
                .totalScore(reviewDto.getRank())
                .content(reviewDto.getContent())
                .build();



        reviewRepository.save(review);

    }

    @Override
    @Transactional
    public void removeReview(Long reviewId) {
        Review review = Review
                .builder()
                .id(reviewId)
                .build();

        reviewRepository.delete(review);
        reviewRepository.findById(reviewId).ifPresent(review1 -> {
            throw new EntityRemoveException();
        });

    }
}
