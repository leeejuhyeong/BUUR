package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.enums.BeerCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class BeerRepositoryImpl implements BeerRepository {

    private final EntityManager em;

    @Override
    public List<Beer> findAll() {
        return em.createQuery("select b from Beer b order by b.id", Beer.class).getResultList();
    }

    @Override
    public List<Beer> findAllByTypeAndOffset(BeerCategory beerCategory, int offset) {
        return em.createQuery("select b from Beer b where b.beerCategory = :beerCategory order by b.id", Beer.class)
                .setParameter("beerCategory", beerCategory)
                .setFirstResult(offset)
                .setMaxResults(18)
                .getResultList();
    }

    @Override
    public List<Beer> findAllByOffset(int offset) {
        return em.createQuery("select b from Beer b order by b.id", Beer.class)
                .setFirstResult(offset)
                .setMaxResults(12)
                .getResultList();
    }

    @Override
    public Beer findById(Long id) {
        return em.createQuery("select b from Beer b where b.id = :id", Beer.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    @Override
    public List<Beer> findAllByNameContainingOrEngNameContaining(String keyword) {
        return em.createQuery("select b from Beer b where b.name like :keyword or b.engName like :keyword", Beer.class)
                .setParameter("keyword", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<String> findNameByNameContainingOrEngNameContaining(String keyword) {
        return em.createQuery("select b.name from Beer b where b.name like :keyword or b.engName like :keyword", String.class)
                .setParameter("keyword", "%" + keyword + "%")
                .getResultList();
    }
}
