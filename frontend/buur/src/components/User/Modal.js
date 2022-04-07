import React, { useState, useEffect } from "react";
import "./modal.css";
import styled from "styled-components";
import SelectBar from "./SelectBar";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open } = props;
  const [review, setReview] = useState({
    beerNo: "",
    content: "",
    rank: 1,
  });

  // 닫기
  const closeModal = (e) => {
    if (e.target.id === "close") props.setColor("#fff");
    setReview({ ...review, content: "" });
    props.setModalOpen(false);
  };

  // 저장 후 닫기
  const saveModal = (e) => {
    const reviewArray = [...props.reviewList];
    reviewArray.push({ ...review, beerNo: props.beer.beerNo });
    props.setReviewList(reviewArray);

    const beerImageArray = [...props.beerImgList];
    beerImageArray.push(props.beer.beerImage);
    props.setBeerImgList(beerImageArray);
    closeModal(e);
  };

  const [footerBtnColor, setFooterBtnColor] = useState("rgb(160, 160, 160)");

  const onChangeContent = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (review.content) {
      setFooterBtnColor("rgb(177, 81, 32)");
    } else {
      setFooterBtnColor("rgb(160, 160, 160)");
    }
  }, [review]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <Section>
          <CloseBtn id="close" onClick={closeModal}>
            &times;
          </CloseBtn>
          <BeerName>{ props.beer.beerName }</BeerName>
          <Main><MainTotal>총점</MainTotal>을 평가해주세요</Main>
          <SelectBar setReview={setReview} review={review} />
          <Review
            id="content"
            name="content"
            placeholder="이 맥주는 어떠셨는지 적어주세요."
            onChange={onChangeContent}
            autoFocus
          ></Review>
          {footerBtnColor === "rgb(160, 160, 160)" && (
            <FooterBtn color={footerBtnColor}>이렇게 평가 할래요!</FooterBtn>
          )}
          {footerBtnColor === "rgb(177, 81, 32)" && (
            <FooterBtn id="save" color={footerBtnColor} onClick={saveModal}>
              이렇게 평가 할래요!
            </FooterBtn>
          )}
        </Section>
      ) : null}
    </div>
  );
};
export default Modal;

/* CSS */
const Section = styled.div`
  position: relative;
  padding: 12px 16px;

  width: 80%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  color: #000000;
  background-color: transparent;
`;


const BeerName = styled.p`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  margin: 30px 0px 0px 0px;
`;

const Main = styled.div`
  font-weight: 500;
  font-size: 13px;
  text-align: center;

  margin: 0px 0px 30px 0px;
  // border-bottom: px solid #dee2e6;
  // border-top: 1px solid #dee2e6;
`;

const MainTotal = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #B15120;
`;

const Review = styled.textarea`
  padding: 15px 15px 45px 15px;
  vertical-align: middle;
  width: 100%;

  font-weight: 400;
  font-size: 11px;

  margin: 0px 0px 25px 0px;

  background: rgba(236, 194, 89, 0.3);
  border: 1px solid rgba(236, 194, 89, 0 3);
  &:focus {
    border: none;
    outline: 1px solid #e9b940;
  }
  border-radius: 10px;
`;

const FooterBtn = styled.div`
  text-align: center;
  padding: 12px 12px;
  font-weight: 900;
  font-size: 13px;
  line-height: 20px;

  color: #fff;
  background: ${(props) => props.color};
  border-radius: 10px;
`;

