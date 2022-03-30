package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Likes;
import com.bigdata.buur.entity.User;

import java.util.List;
import java.util.Set;

public interface LikesRepository {
    // 맥주 좋아요 조회
    List<Likes> findByUserAndBeer(User user, Beer beer);
    // 맥주 좋아요 생성
    void insertLikes(Likes likes);
    // 맥주 좋아요 삭제
    void deleteLikes(Likes likes);
    // 좋아요 맥주 조회
    List<Beer> findBeerByUser(User user);
}
