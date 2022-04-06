import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BlankBeerImg from "../../assets/BlankBeer.png";
import Grid from "@mui/material/Grid";
import SurveyBeerItem from "./SurveyBeerItem";
import { fetchBeerList, fetchSurveyReview } from "./service";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner";

function Survey() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [beerList, setBeerList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [beerImgList, setBeerImgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    setTimeout(() => {
      setLoading(false);
    }, 8000);

    setBeerList(await fetchBeerList());
  }, []);

  const isLoading = () => {
    if (loading) {
      return <Spinner />;
    }
  };

  const saveSurvey = async () => {
    const status = await fetchSurveyReview(reviewList);
    if (status === 200) history.replace("/home");
  };

  const beerBlankImgList = [BlankBeer, BlankBeer, BlankBeer, BlankBeer];

  return (
    <Container>
      {isLoading()}
      <Title>평가할 맥주를 골라주세요</Title>
      <Detail>4개의 맥주를 선택해주세요</Detail>
      <BeerBasketListDiv>
        {beerImgList.map((beer, index) => (
          <Beer
            key={index}
            src={`data:image/png; base64, ${beer}`}
            alt="beerImg"
          />
        ))}
        {beerBlankImgList.slice(beerImgList.length).map((beer, index) => (
          <BlankBeer key={index} />
        ))}
      </BeerBasketListDiv>
      <BeerlistBody>
        <Grid container spacing={{ xs: 2 }}>
          {beerList.map((beer, index) => (
            <Grid item xs={6} sm={2} key={index}>
              <SurveyBeerItem
                setReviewList={setReviewList}
                setBeerImgList={setBeerImgList}
                reviewList={reviewList}
                beerImgList={beerImgList}
                beer={beer}
              />
            </Grid>
          ))}
        </Grid>
      </BeerlistBody>
      {reviewList.length === 4 ? (
        <ChoiceButton onClick={saveSurvey}>평가 완료할래요!</ChoiceButton>
      ) : null}
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
  margin: 54px 0px 0px 84px;
  text-align: center;
  font-weight: 900;
  font-size: 18px;
  line-height: 20px;

  align-items: center;

  color: rgba(0, 0, 0, 0.8);
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
  text-align: center;

  align-items: center;

  color: rgba(177, 81, 32, 0.8);
`;

const BeerBasketListDiv = styled.div`
  padding: 75px;
`;
const BlankBeer = styled.div`
  display: inline-block;

  margin: 50px 5px 0px 5px;
  width: 42px;
  height: 97px;
  background: url(${BlankBeerImg});
  background-size: cover;
`;
const Beer = styled.img`
  display: inline-block;

  margin: 50px 5px 0px 5px;
  width: 42px;
  height: 97px;

  background-size: cover;
`;

const BeerlistBody = styled.div`
  position: fixed;
  top: 235px;
  overflow-y: scroll;
  padding: 16px 16px;
  height: 587px;
`;

const ChoiceButton = styled.button`
  position: fixed;
  font-size: 16px;
  font-weight: 600;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 50px;
  margin: 290px 0px 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  background: rgb(177, 81, 32);
`;
