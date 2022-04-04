package com.bigdata.buur.review.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.review.dto.ReviewScoreInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findTop10ByBeerAndReviewDtBeforeOrderByReviewDtDesc(Beer beer, LocalDateTime reviewDt);

    @Query(value = "SELECT r.total_score AS score, COUNT(*) AS count " +
            "FROM review r " +
            "WHERE r.beer_id = :id " +
            "GROUP BY r.total_score " +
            "ORDER BY r.total_score", nativeQuery = true)
    List<ReviewScoreInterface> findByBeerId(@Param(value = "id") Long id);

    Review findReviewByBeer_IdAndUser_Id(Long beer_id, Long id);
}
