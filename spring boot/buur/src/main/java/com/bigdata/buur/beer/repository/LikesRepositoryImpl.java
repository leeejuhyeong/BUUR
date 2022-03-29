package com.bigdata.buur.beer.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LikesRepositoryImpl implements LikesRepository {

    private final EntityManager em;

    @Override
    public Set<Long> findBeerNoByUserId(Long userNo) {
        return em.createQuery("select l.beer.id from Likes l join fetch l.user where l.user.id =:userNo", Long.class)
                .setParameter("userNo", userNo)
                .getResultStream().collect(Collectors.toSet());

    }
}
