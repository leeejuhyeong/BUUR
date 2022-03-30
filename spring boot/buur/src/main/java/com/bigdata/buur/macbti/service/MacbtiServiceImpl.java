package com.bigdata.buur.macbti.service;

import com.bigdata.buur.macbti.dto.DrinkBeerDto;
import com.bigdata.buur.macbti.repository.MacbtiRepository;
import com.bigdata.buur.macbti.dto.DrinkBeerInterface;
import com.bigdata.buur.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MacbtiServiceImpl implements MacbtiService {

    private final MacbtiRepository macbtiRepository;
    private final UserService userService;

    @Override
    @Transactional
    public List<DrinkBeerDto> findDrinkBeerList() {

        Long id = userService.currentUser();
        LocalDate currentDate = LocalDate.now();
        LocalDate startDate = currentDate.withDayOfMonth(1);
        LocalDate endDate = currentDate.withDayOfMonth(currentDate.lengthOfMonth());

        List<DrinkBeerInterface> drinkBeerList = macbtiRepository.findGroupByBeerWithJPQL(id, startDate, endDate);
        List<DrinkBeerDto> drinkBeerDtoList = new ArrayList<>();

        for (DrinkBeerInterface drinkBeer : drinkBeerList) {
                drinkBeerDtoList.add(DrinkBeerDto.builder()
                        .id(drinkBeer.getId())
                        .beerId(drinkBeer.getBeerId())
                        .count(drinkBeer.getCnt())
                        .beerName(drinkBeer.getBeerName())
                        .build());
        }

        return drinkBeerDtoList;
    }
}
