package com.bigdata.buur.recommend.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.SimilarBeer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecommendRepository extends JpaRepository<SimilarBeer, Long> {
    @Query("select s from SimilarBeer s join fetch s.similar where s.origin = :beer")
    List<SimilarBeer> findTop7ByOriginOrderByIdAsc(@Param("beer") Beer beer);
}
