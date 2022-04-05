package com.bigdata.buur.refrigerator.service;

import com.bigdata.buur.beer.repository.BeerRepository;
import com.bigdata.buur.entity.*;
import com.bigdata.buur.macbti.repository.MacbtiRepository;
import com.bigdata.buur.refrigerator.dto.BasketDto;
import com.bigdata.buur.refrigerator.dto.RefrigeratorDto;
import com.bigdata.buur.refrigerator.dto.RefrigeratorInterface;
import com.bigdata.buur.refrigerator.repository.BeerGroupRepository;
import com.bigdata.buur.refrigerator.repository.BasketRepository;
import com.bigdata.buur.user.repository.UserRepository;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RefrigeratorServiceImpl implements RefrigeratorService {

    private final BasketRepository basketRepository;
    private final BeerGroupRepository beerGroupRepository;
    private final BeerRepository beerRepository;

    private final MacbtiRepository macbtiRepository;

    private final UserRepository userRepository;
    private final UserService userService;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @Override
    public String addRefrigerator(List<BasketDto> basketDtoList) {

        User user = userRepository.findById(userService.currentUser()).orElseThrow(null);
        BeerGroup beerGroup = beerGroupRepository.save(BeerGroup.builder()
                .user(user)
                .build());

        if(beerGroup != null) {
            BeerGroup findBeerGroup = beerGroupRepository.findTopByUserOrderByIdDesc(user);

            for (BasketDto basketDto : basketDtoList) {
                Beer findBeer = beerRepository.findById(basketDto.getBeerId());
                Basket basket = basketRepository.save(Basket.builder()
                        .beer(findBeer)
                        .beerGroup(findBeerGroup)
                        .build());

                DrinkBeer drinkBeer = macbtiRepository.save(DrinkBeer.builder()
                         .beer(findBeer)
                         .user(user)
                         .recordDt(LocalDate.now(ZoneId.of("Asia/Seoul")))
                        .build());

                if(basket == null || drinkBeer == null)
                    return FAIL;
            }
        }
        return SUCCESS;
    }

    @Override
    public List<BasketDto> findRefrigeratorList(int page) {
        int size = 16;

        Pageable pageable = PageRequest.of(page, size);
        Page<Basket> findBasketList = basketRepository.findAll(pageable);
        List<BasketDto> findBasketDtoList = new ArrayList<>();

        for (Basket basket : findBasketList) {

            User user = userRepository.findById(userService.currentUser()).orElseThrow(null);
            BeerGroup beerGroup = beerGroupRepository.findById(basket.getBeerGroup().getId()).orElseThrow(null);
            Beer findBeer = beerRepository.findById(basket.getBeer().getId());

            if(beerGroup.getUser().getId() == user.getId()) {
                findBasketDtoList.add(BasketDto.builder()
                        .beerId(basket.getBeer().getId())
                        .beerName(findBeer.getName())
                        .beerGroupId(beerGroup.getId())
                        .imagePath(findBeer.getImage())
                        .id(user.getId())
                        .build());
            }
        }
        return findBasketDtoList;
    }

    @Override
    public Integer findRefrigeratorTotalPage() {

        Integer totalPage = 0;

        Long id = userService.currentUser();
        Integer groupCnt = beerGroupRepository.countByUser_Id(id);
        totalPage = (groupCnt * 4) / 16;

        return totalPage;
    }

    @Override
    public String removeRefrigerator(int group_id) {

        Long id = Long.valueOf(group_id);
        BeerGroup beerGroup = beerGroupRepository.findById(id).orElseThrow(null);

        List<Basket> basketList = basketRepository.findByBeerGroup(beerGroup);
        for (int i = 0; i < basketList.size(); i++) {
            basketRepository.delete(basketList.get(i));
            basketList.remove(i);
        }

        beerGroupRepository.delete(beerGroup);

        if(basketList.isEmpty())
            return SUCCESS;
        else
            return FAIL;
    }

    @Override
    public List<RefrigeratorDto> findUserRefrigeratorList(int page) {

        Long id = userService.currentUser();
        List<RefrigeratorInterface> refrigeratorList = macbtiRepository.findGroupByBeerAndUserWithJPQL(id, page);
        List<RefrigeratorDto> refrigeratorDtoList = new ArrayList<>();

        for (RefrigeratorInterface refrigerator : refrigeratorList) {
            refrigeratorDtoList.add(RefrigeratorDto.builder()
                    .id(refrigerator.getId())
                    .beerId(refrigerator.getBeerId())
                    .beerName(refrigerator.getBeerName())
                    .imagePath(refrigerator.getImagePath())
                    .count(refrigerator.getCnt())
                    .build());
        }
        return refrigeratorDtoList;
    }

    @Override
    public Integer findUserRefrigeratorTotalPage() {

        Long id = userService.currentUser();
        Integer totalPage = macbtiRepository.countByUser_Id(id);
        totalPage /= 16;

        return totalPage;
    }
}
