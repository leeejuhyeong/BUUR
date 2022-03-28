package com.bigdata.buur.repository;

import com.bigdata.buur.entity.Beer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class BeerRepositoryImpl implements BeerRepository {

    private final EntityManager em;

    @Override
    public List<Beer> findAllByTypeAndOffset(String type, int offset) {
        return em.createQuery("select b from Beer b where b.beerCategory =:type order by b.beerNo", Beer.class)
                .setParameter("type", type)
                .setFirstResult(offset)
                .setMaxResults(12)
                .getResultList();
    }
}
