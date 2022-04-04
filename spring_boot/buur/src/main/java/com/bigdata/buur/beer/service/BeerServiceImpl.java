package com.bigdata.buur.beer.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.beer.dto.BeerDto;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.beer.repository.LikesRepository;
import com.bigdata.buur.entity.Likes;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.enums.BeerCategory;
import com.bigdata.buur.review.dto.ReviewScoreInterface;
import com.bigdata.buur.review.repository.ReviewRepository;
import com.bigdata.buur.user.repository.UserRepository;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BeerServiceImpl implements BeerService {

    private final BeerRepository beerRepository;
    private final LikesRepository likesRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final ReviewRepository reviewRepository;


    @Override
    public List<BeerDto.CommonBeer> findBearList() {
        List<BeerDto.CommonBeer> commonBeerList = new ArrayList<>();
        List<Beer> beerList = beerRepository.findAll();

        for (Beer beer : beerList) {
            commonBeerList.add(BeerDto.CommonBeer.builder()
                    .beerNo(beer.getId())
                    .beerName(beer.getName())
                    .abv(beer.getAbv())
                    .type(beer.getBeerCategory().name())
                    .imagePath(beer.getImage())
                    .build());
        }
        return commonBeerList;
    }

    @Override
    @Transactional
    public List<BeerDto.LikeBeer> findBeerList(String type, int offset) {
        User user = userRepository.findById(userService.currentUser()).orElse(null);

        List<BeerDto.LikeBeer> likeBeerList = new ArrayList<>();
        Set<Beer> beerLikesSet = new HashSet<>(likesRepository.findBeerByUser(user));

        List<Beer> beerList;
        if (type.equals("ALL")) {
            beerList = beerRepository.findAllByOffset(offset);
        } else {
            beerList = beerRepository.findAllByTypeAndOffset(BeerCategory.valueOf(type), offset);
        }

        for (Beer beer : beerList) {
            likeBeerList.add(BeerDto.LikeBeer.builder()
                    .beerNo(beer.getId())
                    .beerName(beer.getName())
                    .imagePath(beer.getImage())
                    .like(beerLikesSet.contains(beer))
                    .build());
        }

        return likeBeerList;
    }

    @Override
    @Transactional
    public BeerDto.Details findBeer(Long id) {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        Beer beer = beerRepository.findById(id);
        List<ReviewScoreInterface> reviewScoreInterface = reviewRepository.findByBeerId(id);
        List<Likes> likesList = likesRepository.findByUserAndBeer(user, beer);

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

        // 점수별 개수 초기화
        Map<Integer, Integer> reviewScoreMap = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            reviewScoreMap.put(i, 0);
        }

        if (reviewScoreInterface != null) {
            for (ReviewScoreInterface scoreInterface : reviewScoreInterface) {
                reviewScoreMap.put(scoreInterface.getScore(), scoreInterface.getCount());
            }
            details.addReviewScoreList(reviewScoreMap);
        }

        if (likesList.size() != 0) {
            details.setLike(true);
        }

        return details;
    }

    @Override
    @Transactional
    public void addLikes(Long id) {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        Beer beer = beerRepository.findById(id);
        likesRepository.saveLikes(Likes.builder()
                .user(user)
                .beer(beer)
                .build());
    }

    @Override
    @Transactional
    public void removeLikes(Long id) {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        Beer beer = beerRepository.findById(id);
        List<Likes> findLikes = likesRepository.findByUserAndBeer(user, beer);
        likesRepository.deleteLikes(findLikes.get(0));
    }

    @Override
    @Transactional
    public List<BeerDto.LikeBeer> findLikeBeerList() {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        List<Beer> likeBeerList = likesRepository.findBeerByUser(user);
        List<BeerDto.LikeBeer> likeBeerDtoList = new ArrayList<>();
        for (Beer beer : likeBeerList) {
            likeBeerDtoList.add(BeerDto.LikeBeer.builder()
                    .beerNo(beer.getId())
                    .beerName(beer.getName())
                    .imagePath(beer.getImage())
                    .like(true)
                    .build());
        }
        return likeBeerDtoList;
    }

    @Override
    @Transactional
    public List<BeerDto.LikeBeer> findSearchBeerList(String keyword) {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        List<Beer> searchBeerList = beerRepository.findAllByNameContainingOrEngNameContaining(keyword);
        Set<Beer> likeBeerSet = new HashSet<>(likesRepository.findBeerByUser(user));
        List<BeerDto.LikeBeer> likeBeerList = new ArrayList<>();

        for (Beer beer : searchBeerList) {
            likeBeerList.add(BeerDto.LikeBeer.builder()
                    .beerNo(beer.getId())
                    .beerName(beer.getName())
                    .imagePath(beer.getImage())
                    .like(likeBeerSet.contains(beer))
                    .build());
        }
        return likeBeerList;
    }
}
