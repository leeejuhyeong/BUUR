package com.bigdata.buur.refrigerator.service;

import com.bigdata.buur.refrigerator.dto.BasketDto;
import com.bigdata.buur.refrigerator.dto.RefrigeratorDto;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface RefrigeratorService {

    public void addRefrigerator(List<BasketDto> basketDtoList);
    public Map<Long, List<BasketDto>> findRefrigeratorList(int page) throws IOException;
    public void removeRefrigerator(Long group_id);
    public List<RefrigeratorDto> findUserRefrigeratorList(int page);
    public Integer findRefrigeratorTotalPage();
    public Integer findUserRefrigeratorTotalPage();

}
