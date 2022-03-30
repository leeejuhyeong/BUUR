package com.bigdata.buur.beer.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.beer.repository.LikesRepository;
import com.bigdata.buur.entity.Likes;
import com.bigdata.buur.enums.BeerCategory;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.relational.core.sql.Like;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.InputStream;
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

        List<Beer> beerList;
        if(type.equals("ALL")) {
            beerList = beerRepository.findAllByOffset(offset);
        } else {
            beerList = beerRepository.findAllByTypeAndOffset(BeerCategory.valueOf(type), offset);
        }

        for (Beer beer : beerList) {
            likeBeerList.add(BeerDto.LikeBeer.builder()
                    .beerNo(beer.getId())
                    .beerName(beer.getName())
                    .imagePath(beer.getImage())
                    .like(beerLikesSet.contains(beer.getId()))
                    .build());
        }

        return likeBeerList;
    }

    @Override
    @Transactional
    public BeerDto.Details findBeer(Long id) {
        Long user_id = userService.currentUser();

        List<Likes> likesList = likesRepository.findByUserIdAndBeerId(user_id, id);

        Beer beer = beerRepository.findById(id);
        BeerDto.Details details = BeerDto.Details.builder()
                .beerNo(beer.getId())
                .name(beer.getName())
                .engName(beer.getEngName())
                .abv(beer.getAbv())
                .ibu(beer.getIbu())
                .origin(beer.getOrigin())
                .food(beer.getFood())
                .imagePath(beer.getImage())
                .build();

        if(likesList.size() != 0) {
            details.setLike(true);
        }

        return details;
    }
}
