package com.bigdata.buur.service;

import com.bigdata.buur.dto.BeerDto;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.Likes;
import com.bigdata.buur.repository.BeerRepository;
import com.bigdata.buur.repository.LikesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class BeerServiceImpl implements BeerService {

    private final BeerRepository beerRepository;
    private final LikesRepository likesRepository;
    private final UserService userService;

    @Override
    public List<BeerDto.LikeBeer> findBeerList(String type, int offset) {
        Long user_no = userService.currentUser();

        // user_no가 좋아요한 맥주 가져오기
        Set<Long> beerLikesSet = likesRepository.findBeerNoByUserId(user_no);

        List<BeerDto.LikeBeer> likeBeerList = new ArrayList<>();
        List<Beer> beerList = beerRepository.findAllByTypeAndOffset(type, offset);

        for (Beer beer : beerList) {
            likeBeerList.add(BeerDto.LikeBeer.builder()
                    .beerNo(beer.getBeerNo())
                    .beerName(beer.getBeerName())
                    .like(beerLikesSet.contains(beer.getBeerNo()))
                    .build());
        }

        return likeBeerList;
    }
}
