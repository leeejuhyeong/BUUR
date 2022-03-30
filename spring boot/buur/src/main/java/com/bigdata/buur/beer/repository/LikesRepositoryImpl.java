package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Likes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LikesRepositoryImpl implements LikesRepository {

    private final EntityManager em;

    @Override
    public Set<Long> findBeerIdByUserId(Long id) {
        return em.createQuery("select l.beer.id from Likes l join l.user where l.user.id = :id", Long.class)
                .setParameter("id", id)
                .getResultStream().collect(Collectors.toSet());
    }

    @Override
    public List<Likes> findByUserIdAndBeerId(Long user_id, Long beer_id) {
        return em.createQuery("select l from Likes l join l.user join l.beer where l.beer.id = :beer_id and l.user.id = :user_id", Likes.class)
                .setParameter("beer_id", beer_id)
                .setParameter("user_id", user_id)
                .getResultList();
    }


}
