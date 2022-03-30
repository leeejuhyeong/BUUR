package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Likes;

import java.util.List;
import java.util.Set;

public interface LikesRepository {
    Set<Long> findBeerIdByUserId(Long id);
    // 맥주 좋아요 여부 확인
    List<Likes> findByUserIdAndBeerId(Long user_id, Long beer_id);
}
