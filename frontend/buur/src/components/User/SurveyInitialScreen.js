import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchBeerList } from "./service";

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.div`
  font-weight: 900;
  font-size: 22px;

  margin: 158px 0 0px;
  text-align: center;

  color: #e9b940;
`;

const Detail = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 1.5;

  margin: 50px 0 0px;
  text-align: center;

  color: rgba(177, 81, 32, 0.6);
`;

const SurveyStartButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 60px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: rgba(233, 185, 64, 0.87);
  border-radius: 10px;

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

const moveSurvey = async () => {
  const beerList = await fetchBeerList();
  localStorage.setItem("beerList", beerList);
  console.log(beerList);
};

function SurveyInitialScreen() {
  return (
    <Container>
      <Title>당신의 취향을 알려주세요</Title>
      <Detail>
        총 네번의 맥주 평가가 있습니다.
        <br /> 맥주의 맛 향 총점 을 평가해주세요.
        <br />
        당신의 취향을 저격 할 맥주를 추천해드릴게요.
      </Detail>
      <Link
        to={{
          pathname: "/Survey",
          state: {
            keyword: "설문조사",
          },
        }}
      >
        <SurveyStartButton onClick={moveSurvey}>
          제 취향을 알려드릴게요
        </SurveyStartButton>
      </Link>
    </Container>
  );
}

export default SurveyInitialScreen;
