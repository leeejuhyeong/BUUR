package com.bigdata.buur.refrigerator.service;

import com.bigdata.buur.refrigerator.dto.BasketDto;
import com.bigdata.buur.refrigerator.dto.RefrigeratorDto;

import java.util.List;

public interface RefrigeratorService {

    public String addRefrigerator(List<BasketDto> basketDtoList);
    public List<BasketDto> findRefrigeratorList(int page);
    public String removeRefrigerator(int group_id);
    public List<RefrigeratorDto> findUserRefrigeratorList(int page);

}
