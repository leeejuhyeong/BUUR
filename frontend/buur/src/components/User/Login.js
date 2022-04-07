import styled from "styled-components";
import BUURlogo from "../../assets/BUUR_logo.svg";
import React, { useState } from "react";
import { fetchLogin, fetchUserInfo } from "./service";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const history = useHistory();
  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

  const onChangeAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSubmitAccount = async () => {
    try {
      const JWT = await fetchLogin(account);
      localStorage.setItem("jwt", JWT);
      const userInfo = await fetchUserInfo();
      if (userInfo === "NEW_USER") history.replace("/surveyinitialscreen");
      else if (userInfo === "OLD_USER") history.replace("/home");
    } catch (error) {
      window.alert('로그인에 실패하셨습니다!');
    }
  };

  const moveSignUp = () => {
    history.replace("/signup");
  };

  return (
    <Container>
      <Jumbotron>
        <Logo src={ BUURlogo }></Logo>
      </Jumbotron>
      <ContentBox>
      <Text>아이디</Text>
      <Input
        id="id"
          name="id"
          autoFocus
        placeholder="아이디를 입력해주세요"
        onChange={onChangeAccount}
      />
      <Text>비밀번호</Text>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangeAccount}
      />
      <LoginButton onClick={onSubmitAccount}>로그인</LoginButton>
      <JoinText>
        회원이 아니신가요? <Join onClick={moveSignUp}>회원가입</Join>
      </JoinText>
      </ContentBox>
    </Container>
  );
}

export default LoginForm;


const Text = styled.div`
  font-weight: 600;
  height: 30px;
  margin: 20px 0 0px;
`;

const JoinText = styled.div`
  font-weight: 500;
  font-size: 13px;
  height: 30px;
  margin: 20px 0 0px;
  text-align: center;
`;

const Join = styled.a`
  font-weight: 600;
  color: rgb(177, 81, 32);
  text-decoration: none;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 66px;
  margin-left: 15px;
`;

const Jumbotron = styled.div`
  position: fixed;
  width: 100%;
  height: 130px;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(233, 185, 64);
`;

const Container = styled.div`
  padding-top: 155px;
  display:flex;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 30px;
  max-width: 400px;
`;

const Input = styled.input`
  overflow: hidden;
  width: 100%;
  height: 40px;
  padding: 20px;

  margin: 0 0 20px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  &:focus {
    border: none;
    outline: 1px solid #e9b940;
  }
`;

const LoginButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 40px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  background-color: rgb(233, 185, 64);
  border-radius: 10px;
`;
