package com.bigdata.buur.refrigerator.repository;

import com.bigdata.buur.entity.BeerGroup;
import com.bigdata.buur.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeerGroupRepository extends JpaRepository<BeerGroup, Long> {

    BeerGroup findTopByUserOrderByIdDesc(User user);
    Integer countByUser_Id(Long id);

}
