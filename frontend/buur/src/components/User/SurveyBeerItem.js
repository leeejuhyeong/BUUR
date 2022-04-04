import React, { useState } from "react";
import beerImg from "../../assets/beer_sample.png";
import styled from "styled-components";
import Modal from "./Modal.js";

const SurveyBeerItem = (props) => {
  //   const onClick = () => {
  //     color === "#fff" ? setColor("#ECC259") : setColor("#fff");
  //   };
  console.log(props.beer.beername);

  const [color, setColor] = useState("#fff");
  const [modalOpen, setModalOpen] = useState(false);
  const click = () => {
    if (color === "#fff") {
      setColor("#ECC259");
      setModalOpen(true);
      // sessionStorage.setItem("review", props.beerList.review);

      // 맥주 정보 넘김
      // console.log(props.beer.name);
    } else {
      setColor("#fff");
      return;
    }
  };
  // const setReview=()=>{
  //   props.beer.review;
  // }

  const closeModal = () => {
    setModalOpen(false);
    // console.log(props.beer.review);
  };
  //   const changeReivew = () => {
  //     console.log();
  //     // props.beer(props.beer.review:personNameFromChild );
  //  }

  // const setReview = (props) => {
  //   const review = props;
  // };

  return (
    <>
      <BeerBox color={color} onClick={click}>
        <BeerImg />
        <BeerName>{props.beer.beername}</BeerName>
        <Alcohol>알코올</Alcohol> <AlcoholInfo>{props.beer.abv}</AlcoholInfo>
        <Kind>종류</Kind> <KindInfo>{props.beer.type}</KindInfo>
      </BeerBox>
      <Modal open={modalOpen} close={closeModal}></Modal>
    </>
  );
};

export default SurveyBeerItem;

/* css */
const BeerBox = styled.div`
  width: 153px;
  height: 75px;
  padding: 10px;
  background: ${(props) => props.color};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const BeerImg = styled.div`
  position: absolute;
  margin: 0px 0px 0px 12px;
  width: 23px;
  height: 53px;

  background: url(${beerImg});
  background-size: cover;
`;

const BeerName = styled.div`
  position: absolute;

  margin: 0px 0px 0px 57px;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
`;
const Alcohol = styled.div`
  position: absolute;

  margin: 25px 0px 0px 57px;
  font-weight: 700;
  font-size: 10px;
  line-height: 10px;
`;
const AlcoholInfo = styled.div`
  position: absolute;

  margin: 25px 0px 0px 88px;
  font-weight: 100;
  font-size: 10px;
  line-height: 10px;
`;
const Kind = styled.div`
  position: absolute;

  margin: 39px 0px 0px 57px;
  font-weight: 700;
  font-size: 10px;
  line-height: 10px;
`;
const KindInfo = styled.div`
  position: absolute;

  margin: 39px 0px 0px 88px;
  font-weight: 400;
  font-size: 9px;
  line-height: 10px;
`;
