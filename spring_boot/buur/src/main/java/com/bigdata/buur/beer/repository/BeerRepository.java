package com.bigdata.buur.beer.repository;

import com.bigdata.buur.entity.Beer;
import com.bigdata.buur.enums.BeerCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BeerRepository extends JpaRepository<Beer, Long> {
    // 맥주 전체 조회
    List<Beer> findByOrderById();
    // 종류별 맥주 조회
    Page<Beer> findByBeerCategory(BeerCategory beerCategory, Pageable pageable);
    // 맥주 상세정보 조회
    Beer findOneById(Long id);
    // 맥주 검색 자동완성
    List<Beer> findByNameContainingOrEngNameContaining(String keyword1, String keyword2);
    // 맥주 이름 자동완성
    @Query("select b.name from Beer b where b.name like concat('%', :keyword1, '%') or b.engName like concat('%', :keyword2, '%')")
    List<String> findNameByNameContainingOrEngNameContaining(String keyword1, String keyword2);
}
