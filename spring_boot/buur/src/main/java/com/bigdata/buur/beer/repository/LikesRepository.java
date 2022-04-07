package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Likes;
import com.bigdata.buur.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    // 맥주 좋아요 조회
    Likes findByUserAndBeer(User user, Beer beer);
    // 좋아요 맥주 조회
    @Query("select l.beer from Likes l where l.user = :user")
    List<Beer> findBeerByUser(User user);
    // 좋아요 맥주 번호 조회
    @Query("select l.beer.id from Likes l where l.user = :user")
    List<Long> findBeerIdByUser(User user);

}
