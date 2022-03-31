package com.bigdata.buur.review.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findTop10ByBeerAndReviewDtBeforeOrderByReviewDtDesc(Beer beer, LocalDateTime reviewDt);


}
