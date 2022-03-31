package com.bigdata.buur.macbti.repository;

import com.bigdata.buur.entity.DrinkBeer;
import com.bigdata.buur.macbti.dto.DrinkBeerInterface;
import com.bigdata.buur.refrigerator.dto.RefrigeratorInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MacbtiRepository extends JpaRepository<DrinkBeer, Long> {

    @Query(
            value = "SELECT d.id as id, d.beer_id as beerId, count(d.beer_id) as cnt, b.name as beerName " +
                    "FROM drink_beer d, beer b " +
                    "WHERE d.id = :id " +
                    "AND b.beer_id = d.beer_id " +
                    "AND d.record_dt BETWEEN :start AND :end " +
                    "GROUP BY d.beer_id " +
                    "ORDER BY count(d.beer_id) DESC, d.beer_id " +
                    "LIMIT 4", nativeQuery = true
    )
    List<DrinkBeerInterface> findGroupByBeerWithJPQL(@Param(value = "id") Long id,
                                                     @Param(value = "start") LocalDate startDate,
                                                     @Param(value = "end") LocalDate endDate);


    @Query(
            value = "SELECT d.id as Id, d.beer_id as beerId, b.image as imagePath, b.name as beerName, count(d.beer_id) as cnt " +
                    "FROM drink_beer d, beer b " +
                    "WHERE d.id = :id " +
                    "AND b.beer_id = d.beer_id " +
                    "GROUP BY d.beer_id " +
                    "ORDER BY count(d.beer_id) DESC " +
                    "LIMIT 12 OFFSET :page", nativeQuery = true
    )
    List<RefrigeratorInterface> findGroupByBeerAndUserWithJPQL(@Param(value = "id") Long id,
                                                               @Param(value = "page") int page);

}