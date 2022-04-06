import React from "react";
import styled from "styled-components";
import { fetchBeerList } from "./service";
import { useHistory } from "react-router-dom";
import Welcome from "../../assets/Welcome.png";

function SurveyInitialScreen() {
  const history = useHistory();
  const moveSurvey = async () => {
    const beerList = await fetchBeerList();
    localStorage.setItem("beerList", beerList);
    history.replace("/Survey");
  };

  return (
    <Container>
      <WelcomeImg></WelcomeImg>
      <Title>처음 방문 하셨나요?</Title>
      <Detail>
        'BUUR'는 편의점에서 판매중인
        <br />
        맥주를 추천해주는 서비스 입니다.
        <br />
        당신의 취향을 저격 할 맥주를 추천해드릴게요.
      </Detail>
      <SurveyStartButton onClick={moveSurvey}>
        제 취향을 알려드릴게요
      </SurveyStartButton>
    </Container>
  );
}

export default SurveyInitialScreen;

/* CSS */
const Container = styled.div`
  padding: 20px;
`;

const WelcomeImg = styled.div`
  height: 180px;
  overflow: hidden;
  margin: 120px auto 0px;
  background: url(${Welcome});
  background-size: cover;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 27px;

  margin: 90px 0 0px;
  text-align: center;

  color: rgba(0, 0, 0, 0.8);
`;

const Detail = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 1.8;

  margin: 15px 0 0px;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
`;

const SurveyStartButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 20px 0 0px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;

  background-color: rgb(177, 81, 32);
  border-radius: 10px;
`;
