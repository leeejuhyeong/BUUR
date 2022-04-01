package com.bigdata.buur.review.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Review;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.review.dto.ReviewAvgInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findTop10ByBeerAndReviewDtBeforeOrderByReviewDtDesc(Beer beer, LocalDateTime reviewDt);

    @Query(value = "SELECT AVG(r.total_score) as avg, SUM(r.total_score) as sumTotalScore, COUNT(r.review_id) as cnt " +
            "FROM review r " +
            "WHERE r.beer_id = :id " +
            "GROUP BY r.beer_id", nativeQuery = true)
    ReviewAvgInterface findOneByBeerId(@Param(value = "id") Long id);
}
