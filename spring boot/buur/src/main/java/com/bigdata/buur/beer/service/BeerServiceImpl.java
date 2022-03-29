package com.bigdata.buur.beer.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.beer.repository.LikesRepository;
import com.bigdata.buur.enums.BeerCategory;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BeerServiceImpl implements BeerService {

    private final BeerRepository beerRepository;
    private final LikesRepository likesRepository;
    private final UserService userService;

    @Override
    @Transactional
    public List<BeerDto.LikeBeer> findBeerList(String type, int offset) {
        Long user_id = userService.currentUser();

        List<BeerDto.LikeBeer> likeBeerList = new ArrayList<>();
        Set<Long> beerLikesSet = likesRepository.findBeerIdByUserId(user_id);
        List<Beer> beerList = beerRepository.findAllByTypeAndOffset(BeerCategory.valueOf(type), offset);

        for (Beer beer : beerList) {
            likeBeerList.add(BeerDto.LikeBeer.builder()
                    .beerNo(beer.getId())
                    .beerName(beer.getName())
                    .like(beerLikesSet.contains(beer.getId()))
                    .build());
        }

        return likeBeerList;
    }
}
