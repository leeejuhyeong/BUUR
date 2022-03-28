package com.bigdata.buur.repository;

import com.bigdata.buur.entity.Likes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LikesRepositoryImpl implements LikesRepository {

    private final EntityManager em;

    @Override
    public Set<Long> findBeerNoByUserId(Long userNo) {
        return em.createQuery("select l.beer.beerNo from Likes l join fetch l.user where l.user.userNo =:userNo", Long.class)
                .setParameter("userNo", userNo)
                .getResultStream().collect(Collectors.toSet());

    }
}
