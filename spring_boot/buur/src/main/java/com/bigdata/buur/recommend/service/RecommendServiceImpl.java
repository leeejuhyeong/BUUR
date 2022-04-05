package com.bigdata.buur.recommend.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.beer.repository.LikesRepository;
import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.entity.SimilarBeer;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.recommend.dto.DjangoDto;
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

    private static String uri = "https://j6b102.p.ssafy.io/api-v2/new/";
    private final UserRepository userRepository;
    private final UserService userService;
    private final LikesRepository likesRepository;
    private final BeerRepository beerRepository;
    private final RecommendRepository recommendRepository;

    @Override
    @Transactional
    public List<RecommendDto> findRecommendBeerList() throws ConnectException {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        System.out.println(user.getId());
        RestTemplate restTemplate = new RestTemplate();

//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        DjangoDto[] recommendBeerArray = restTemplate.getForObject(uri + user.getId(), DjangoDto[].class);
        Set<Long> likeBeerSet = new HashSet<>(likesRepository.findBeerIdByUser(user));

        List<RecommendDto> recommendDtoList = new ArrayList<>();
        for (DjangoDto djangoDto : recommendBeerArray) {
            recommendDtoList.add(RecommendDto.builder()
                    .beerNo(djangoDto.getBeer_id())
                    .beerName(djangoDto.getName())
                    .image(djangoDto.getImage())
                    .like(likeBeerSet.contains(djangoDto.getBeer_id()))
                    .build());
        }

        return recommendDtoList;
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
                    .beerNo(similarBeer.getSimilar().getId())
                    .beerName(similarBeer.getSimilar().getName())
                    .image(similarBeer.getSimilar().getImage())
                    .like(likeBeerSet.contains(similarBeer.getSimilar()))
                    .build());
        }
        return similarBeerDtoList;
    }
}
