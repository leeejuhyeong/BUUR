import React, { useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styled from "styled-components";

const SelectBar = () => {
  const [percent, setPercent] = useState(0);
  const changePercent0 = () => {
    setPercent(0);
  };
  const changePercent25 = () => {
    setPercent(25);
  };
  const changePercent50 = () => {
    setPercent(50);
  };
  const changePercent75 = () => {
    setPercent(75);
  };
  const changePercent100 = () => {
    setPercent(100);
  };

  return (
    <Container>
      <ProgressBar percent={percent} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)">
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

  background: rgba(177, 81, 32, 0.87);
  border-radius: 100px;
`;

const Container = styled.div`
  margin: 0px 30px 30px 30px;
`;
