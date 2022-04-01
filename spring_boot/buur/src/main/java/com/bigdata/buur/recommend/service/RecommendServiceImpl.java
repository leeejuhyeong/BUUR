package com.bigdata.buur.recommend.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.beer.repository.LikesRepository;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.SimilarBeer;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.recommend.dto.RecommendDto;
import com.bigdata.buur.recommend.repository.RecommendRepository;
import com.bigdata.buur.user.repository.UserRepository;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.net.ConnectException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    private static String uri = "http://localhost:8000/api-v2/new/";
    private final UserRepository userRepository;
    private final UserService userService;
    private final LikesRepository likesRepository;
    private final BeerRepository beerRepository;
    private final RecommendRepository recommendRepository;

    @Override
    @Transactional
    public List<RecommendDto> findRecommendBeerList() throws ConnectException {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        uri += user.getId();
        RestTemplate restTemplate = new RestTemplate();

//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        RecommendDto[] recommendBeerArray = restTemplate.getForObject(uri, RecommendDto[].class);
        Set<Long> likeBeerSet = new HashSet<>(likesRepository.findBeerIdByUser(user));

        for (RecommendDto recommend : recommendBeerArray) {
            recommend.setLikes(likeBeerSet.contains(recommend.getBeer_no()));
        }

        return new ArrayList<>(Arrays.asList(recommendBeerArray));
    }

    @Override
    @Transactional
    public List<RecommendDto> findSimilarBeerList(Long id) {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        Beer beer = beerRepository.findById(id);
        Set<Beer> likeBeerSet = new HashSet<>(likesRepository.findBeerByUser(user));
        List<SimilarBeer> similarBeerList = recommendRepository.findTop7ByOriginOrderByIdAsc(beer);
        List<RecommendDto> similarBeerDtoList = new ArrayList<>();

        for (SimilarBeer similarBeer : similarBeerList) {
            similarBeerDtoList.add(RecommendDto.builder()
                    .beer_no(similarBeer.getSimilar().getId())
                    .beer_name(similarBeer.getSimilar().getName())
                    .beer_image(similarBeer.getSimilar().getImage())
                    .likes(likeBeerSet.contains(similarBeer.getSimilar()))
                    .build());
        }
        return similarBeerDtoList;
    }
}
