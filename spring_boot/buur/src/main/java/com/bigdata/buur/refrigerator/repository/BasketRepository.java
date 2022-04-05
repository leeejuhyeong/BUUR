package com.bigdata.buur.refrigerator.repository;

import com.bigdata.buur.entity.Basket;
import com.bigdata.buur.entity.BeerGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BasketRepository extends JpaRepository<Basket, Long> {

    List<Basket> findByBeerGroup(BeerGroup beerGroup);
    Page<Basket> findByBeerGroup_User_Id(Pageable pageable, Long id);
}
