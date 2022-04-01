package com.bigdata.buur.recommend.service;

import com.bigdata.buur.beer.repository.LikesRepository;
import com.bigdata.buur.entity.User;
import com.bigdata.buur.recommend.dto.RecommendDto;
import com.bigdata.buur.user.repository.UserRepository;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.nio.charset.Charset;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService{

    private static String uri = "http://localhost:8000/api-v2/new/";
    private final UserRepository userRepository;
    private final UserService userService;
    private final LikesRepository likesRepository;

    @Override
    @Transactional
    public List<RecommendDto> findRecommendBeerList() {
        User user = userRepository.findById(userService.currentUser()).orElse(null);
        uri += user.getId();
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        RecommendDto[] recommendBeerArray = restTemplate.getForObject(uri, RecommendDto[].class);
        Set<Long> likeBeerList = new HashSet<>(likesRepository.findBeerIdByUser(user));

        for (RecommendDto recommend : recommendBeerArray) {
            recommend.setLikes(likeBeerList.contains(recommend.getBeer_no()));
        }

        return new ArrayList<>(Arrays.asList(recommendBeerArray));
    }
}
