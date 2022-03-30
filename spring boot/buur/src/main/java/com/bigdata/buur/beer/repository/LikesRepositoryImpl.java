package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Likes;
import com.bigdata.buur.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LikesRepositoryImpl implements LikesRepository {

    private final EntityManager em;

    @Override
    public List<Likes> findByUserAndBeer(User user, Beer beer) {
        return em.createQuery("select l from Likes l where l.user = :user and l.beer = :beer", Likes.class)
                .setParameter("user", user)
                .setParameter("beer", beer)
                .getResultList();
    }

    @Transactional
    @Override
    public void insertLikes(Likes likes) {
        em.persist(likes);
    }

    @Transactional
    @Override
    public void deleteLikes(Likes likes) {
        em.remove(likes);
    }

    @Override
    public List<Beer> findBeerByUser(User user) {
        return em.createQuery("select l.beer from Likes l where l.user = :user", Beer.class)
                .setParameter("user", user)
                .getResultList();
    }
}
