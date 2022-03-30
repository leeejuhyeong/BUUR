import React from "react";
import styled from "styled-components";
import Heineken from "../../assets/Heineken.png";
import BlankBeer from "../../assets/BlankBeer.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BeerItem from "../../components/Beer/BeerItem";

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
  top: 245px;
  overflow-y: scroll;
  padding: 16px 16px;
  height: 587px;
`;
const beerList = [
  { name: "호가든", id: "a", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "b", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "c", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "d", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "e", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "f", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "곰표", id: "g", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "h", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
];
function Survey() {
  return (
    <Container>
      <Title>평가할 맥주를 골라주세요</Title>
      <Detail>최소 4개의 맥주를 선택해주세요</Detail>
      <Beer></Beer>
      <Blank1></Blank1>
      <Blank2></Blank2>
      <Blank3></Blank3>
      <BeerlistBody>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2 }}>
            {beerList.map((beer, index) => (
              <Grid item xs={6} sm={2} key={index}>
                <BeerItem beer={beer} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </BeerlistBody>
    </Container>
  );
}

export default Survey;
