import React from "react";
import styled from "styled-components";
import Heineken from "../../assets/Heineken.png";
import BlankBeer from "../../assets/BlankBeer.png";

const Container = styled.div``;

const LeftBox = styled.div`
  position: absolute;
  width: 153px;
  height: 75px;
  left: 18px;
  top: 245px;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const RightBox = styled.div`
  position: absolute;
  width: 153px;
  height: 75px;
  left: 188px;
  top: 245px;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
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
function Survey() {
  return (
    <Container>
      <Title>평가할 맥주를 골라주세요</Title>
      <Detail>최소 4개의 맥주를 선택해주세요</Detail>
      <Beer></Beer>
      <Blank1></Blank1>
      <Blank2></Blank2>
      <Blank3></Blank3>
      <LeftBox></LeftBox>
      <RightBox></RightBox>
    </Container>
  );
}

export default Survey;
