package com.bigdata.buur.service;

import com.bigdata.buur.dto.BeerDto;

import java.util.List;

public interface BeerService {
    List<BeerDto.LikeBeer> findBeerList(String type, int offset);
}
