package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Beer;

import java.util.List;

public interface BeerRepository {

    List<Beer> findAllByTypeAndOffset(String type, int offset);

}
