import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  position: absolute;
  width: 169px;
  height: 66px;
  left: 96px;
  top: 22px;

  background: url(styles\fonts\image/BUUR Logo_color.png);
`;

const Jumbotron = styled.div`
  position: absolute;
  width: 360px;
  height: 116px;
  left: 0px;
  top: 0px;

  background: #ecc259;
`;

const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
`;

const LoginButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
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

const SignupButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: rgba(177, 81, 32, 0.87);
  border-radius: 10px;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;
//아디 비번 값 받기
//값없으면 disabled
function LoginForm() {
  return (
    <Container>
      <Jumbotron></Jumbotron>
      <Logo></Logo>
      <Input id="id" name="id" placeholder="아이디를 입력해주세요" />
      <Input id="password" name="password" type="password" placeholder="비밀번호를 입력해주세요" />
      <LoginButton>로그인</LoginButton>
      <SignupButton>회원가입</SignupButton>
    </Container>
  );
}

export default LoginForm;
