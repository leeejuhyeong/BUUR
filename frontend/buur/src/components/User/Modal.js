import React, { useState, useEffect } from "react";
import "./modal.css";
import styled from "styled-components";
import SelectBar from "./SelectBar";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  const [review, setReview] = useState("");
  const [footerBtnColor, setFooterBtnColor] = useState(
    "rgba(160, 160, 160, 0.38)"
  );

  const onChangeReview = (e) => {
    setReview(e.target.value);
  };
  // changeReivew = () => {
  //   beerReview = review;
  //   return beerReview;
  // };

  // console.log(props.review);
  useEffect(() => {
    console.log(review);
    if (review) {
      setFooterBtnColor("rgba(177, 81, 32, 0.87)");
    } else {
      setFooterBtnColor("rgba(160, 160, 160, 0.38)");
      // button = <FooterBtn color={footerBtnColor}>이렇게 평가 할래요!</FooterBtn>;
    }
  }, [review]);

  // const onChangeReview = (e) => {
  //   setReview({ [e.target.name]: e.target.value }, () => {
  //     console.log(review);
  //     if (review) {
  //       setFooterBtnColor("rgba(177, 81, 32, 0.87)");
  //     } else {
  //       setFooterBtnColor("rgba(160, 160, 160, 0.38)");
  //     }
  //   });
  // };

  // const onChangeReview = (e) => {
  //   setReview(e.target.value);
  //   if (review) {
  //     setFooterBtnColor("rgba(177, 81, 32, 0.87)");
  //   } else {
  //     setFooterBtnColor("rgba(160, 160, 160, 0.38)");
  //   }
  //   console.log(review);
  // };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <Section>
          <CloseBtn onClick={close}>&times;</CloseBtn>
          <Main>총점을 평가해주세요</Main>
          <SelectBar />
          <Review
            id="review"
            name="review"
            placeholder="이 맥주는 어떠셨는지 적어주세요."
            onChange={onChangeReview}
          ></Review>
          {footerBtnColor === "rgba(160, 160, 160, 0.38)" && (
            <FooterBtn color={footerBtnColor}>이렇게 평가 할래요!</FooterBtn>
          )}
          {footerBtnColor === "rgba(177, 81, 32, 0.87)" && (
            <FooterBtn color={footerBtnColor} onClick={close}>
              이렇게 평가 할래요!
            </FooterBtn>
          )}
          {/* <FooterBtn color={footerBtnColor} onClick={close}>
            이렇게 평가 할래요!
          </FooterBtn> */}
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

const Main = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-align: center;

  margin: 40px 0px 30px 0px;
  // border-bottom: px solid #dee2e6;
  // border-top: 1px solid #dee2e6;
`;
const Review = styled.textarea`
  padding: 15px 15px 45px 15px;
  vertical-align: middle;
  width: 100%;

  font-weight: 400;
  font-size: 11px;

  margin: 0px 0px 25px 0px;

  background: rgba(236, 194, 89, 0.3);
  border: 1px solid rgba(236, 194, 89, 0.3);
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
