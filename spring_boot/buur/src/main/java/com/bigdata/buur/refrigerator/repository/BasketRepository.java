package com.bigdata.buur.refrigerator.repository;

import com.bigdata.buur.entity.Basket;
import com.bigdata.buur.entity.BeerGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BasketRepository extends JpaRepository<Basket, Long> {

    List<Basket> findByBeerGroup(BeerGroup beerGroup);

}
