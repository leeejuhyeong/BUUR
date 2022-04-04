import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heineken from "../../assets/Heineken.png";
import BlankBeer from "../../assets/BlankBeer.png";
import Grid from "@mui/material/Grid";
import SurveyBeerItem from "./SurveyBeerItem";
import { fetchBeerList } from "./service";

// const [review, setReview] = useState("");
// sessionStorage.setItem("review", beerList.review);

function Survey() {
  // const beerList = await fetchBeerList();
  // console.log(beerList);
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  // const [beerList, setBeerList] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const beerList = await fetchBeerList();
  //     console.log(beerList);
  //   }
  // }, []);
  const beerList = localStorage.getItem("beerList");
  console.log(beerList);
  return (
    <Container>
      <Title>평가할 맥주를 골라주세요</Title>
      <Detail>최소 4개의 맥주를 선택해주세요</Detail>
      <Beer></Beer>
      <Blank1></Blank1>
      <Blank2></Blank2>
      <Blank3></Blank3>
      <BeerlistBody>
        <Grid container spacing={{ xs: 2 }}>
          {beerList.map((beer, index) => (
            <Grid item xs={6} sm={2} key={index}>
              <SurveyBeerItem beer={beer} />
            </Grid>
          ))}
        </Grid>
      </BeerlistBody>
    </Container>
  );
}

export default Survey;

/* css */
const Container = styled.div``;

const Title = styled.div`
  position: absolute;
  width: 192px;
  height: 20px;
  left: 84px;
  top: 54px;

  font-weight: 900;
  font-size: 18px;
  line-height: 20px;

  display: flex;
  align-items: center;

  color: #e9b940;
`;

const Detail = styled.div`
  position: absolute;
  width: 133px;
  height: 20px;
  left: 113px;
  top: 79px;

  font-weight: 900;
  font-size: 10px;
  line-height: 20px;

  display: flex;
  align-items: center;

  color: rgba(177, 81, 32, 0.6);
`;

const Beer = styled.div`
  position: absolute;
  width: 42px;
  height: 97px;
  left: 80px;
  top: 118px;
  background: url(${Heineken});
  background-size: cover;
`;
const Blank1 = styled.div`
  position: absolute;
  width: 42px;
  height: 97px;
  left: 130px;
  top: 118px;

  background: url(${BlankBeer});
  background-size: cover;
`;

const Blank2 = styled.div`
  position: absolute;
  width: 42px;
  height: 97px;
  left: 189px;
  top: 118px;

  background: url(${BlankBeer});
  background-size: cover;
`;

const Blank3 = styled.div`
  position: absolute;
  width: 41px;
  height: 97px;
  left: 237px;
  top: 118px;

  background: url(${BlankBeer});
  background-size: cover;
`;
const BeerlistBody = styled.div`
  position: absolute;
  top: 235px;
  overflow-y: scroll;
  padding: 16px 16px;
  height: 587px;
`;
