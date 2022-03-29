package com.bigdata.buur.review.repository;

import com.bigdata.buur.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
