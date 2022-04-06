import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal.js";

const SurveyBeerItem = (props) => {
  const [color, setColor] = useState("#fff");
  const [modalOpen, setModalOpen] = useState(false);

  const click = () => {
    if (color === "#fff") {
      if (props.reviewList.length >= 4) {
        return;
      }
      setColor("#ECC259");
      setModalOpen(true);
    } else {
      let removeIndex;
      for (let i = 0; i < props.beerImgList.length; i++) {
        if (props.beerImgList[i] === props.beer.beerImage) {
          removeIndex = i;
        }
      }

      const beerImgListArr = [...props.beerImgList];
      beerImgListArr.splice(removeIndex, 1);
      props.setBeerImgList(beerImgListArr);

      const reviewListArr = [...props.reviewList];
      reviewListArr.splice(removeIndex, 1);
      props.setReviewList(reviewListArr);

      setColor("#fff");
    }
  };

  return (
    <>
      <BeerBox color={color} onClick={click}>
        <BeerImg
          src={`data:image/png; base64, ${props.beer.beerImage}`}
          alt="beerImg"
        />
        <BeerName>{props.beer.beerName}</BeerName>
        <Alcohol>알코올</Alcohol> <AlcoholInfo>{props.beer.abv}</AlcoholInfo>
        <Kind>종류</Kind> <KindInfo>{props.beer.type}</KindInfo>
      </BeerBox>
      <Modal
        setReviewList={props.setReviewList}
        setBeerImgList={props.setBeerImgList}
        reviewList={props.reviewList}
        beerImgList={props.beerImgList}
        open={modalOpen}
        beer={props.beer}
        setModalOpen={setModalOpen}
        setColor={setColor}
      ></Modal>
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

const BeerImg = styled.img`
  position: absolute;
  margin: 0px 0px 0px 6px;
  width: 23px;
  height: 53px;

  background-size: cover;
`;

const BeerName = styled.div`
  position: absolute;

  margin: 0px 0px 0px 40px;
  width: 98px;
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; 
  overflow: hidden;
`;
const Alcohol = styled.div`
  position: absolute;

  margin: 25px 0px 0px 40px;
  font-weight: 700;
  font-size: 10px;
  line-height: 10px;
`;
const AlcoholInfo = styled.div`
  position: absolute;

  margin: 25px 0px 0px 75px;
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
`;
const Kind = styled.div`
  position: absolute;

  margin: 39px 0px 0px 40px;
  font-weight: 700;
  font-size: 10px;
  line-height: 10px;
`;
const KindInfo = styled.div`
  position: absolute;

  margin: 39px 0px 0px 65px;
  font-weight: 600;
  font-size: 9px;
  line-height: 10px;
`;
