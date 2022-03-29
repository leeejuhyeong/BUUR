package com.bigdata.buur.beer.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.beer.repository.LikesRepository;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BeerServiceImpl implements BeerService {

    private final BeerRepository beerRepository;
    private final LikesRepository likesRepository;
    private final UserService userService;

    @Override
    @Transactional
    public List<BeerDto.LikeBeer> findBeerList(String type, int offset) {
        Long user_no = userService.currentUser();

        // user_no가 좋아요한 맥주 가져오기
        Set<Long> beerLikesSet = likesRepository.findBeerNoByUserId(user_no);

        List<BeerDto.LikeBeer> likeBeerList = new ArrayList<>();
        List<Beer> beerList = beerRepository.findAllByTypeAndOffset(type, offset);

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
