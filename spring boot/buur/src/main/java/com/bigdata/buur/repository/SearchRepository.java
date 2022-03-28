package com.bigdata.buur.repository;

import com.bigdata.buur.entity.SearchHistory;
import com.bigdata.buur.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepository extends JpaRepository<SearchHistory, Long> {

    List<SearchHistory> findTop5ByUserOrderBySearchNoDesc(User user);
    //findTop5ByOrderBySearchNoDesc
}
