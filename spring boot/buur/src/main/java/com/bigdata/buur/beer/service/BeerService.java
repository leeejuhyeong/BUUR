package com.bigdata.buur.beer.service;

import com.bigdata.buur.beer.dto.BeerDto;

import java.util.List;

public interface BeerService {
    List<BeerDto.LikeBeer> findBeerList(String type, int offset);
}
