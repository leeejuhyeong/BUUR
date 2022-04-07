import React, { useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styled from "styled-components";

const SelectBar = (props) => {
  const [percent, setPercent] = useState(0);

  const changePercent0 = () => {
    setPercent(0);
    props.setReview({ ...props.review, rank: 1 });
  };
  const changePercent25 = () => {
    setPercent(25);
    props.setReview({ ...props.review, rank: 2 });
  };
  const changePercent50 = () => {
    setPercent(50);
    props.setReview({ ...props.review, rank: 3 });
  };
  const changePercent75 = () => {
    setPercent(75);
    props.setReview({ ...props.review, rank: 4 });
  };
  const changePercent100 = () => {
    setPercent(100);
    props.setReview({ ...props.review, rank: 5 });
  };

  return (
    <Container>
      <ProgressBar
        percent={percent}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <Icon
              onClick={changePercent0}
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <Icon
              onClick={changePercent25}
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <Icon
              onClick={changePercent50}
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <Icon
              onClick={changePercent75}
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <Icon
              onClick={changePercent100}
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            />
          )}
        </Step>
      </ProgressBar>
    </Container>
  );
};

export default SelectBar;

const Icon = styled.div`
  width: 25px;
  height: 26px;

  background: rgb(177, 81, 32);
  border-radius: 100px;
`;

const Container = styled.div`
  margin: 0px 30px 30px 30px;
`;
