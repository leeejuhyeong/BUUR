import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../actions/user";
import styled from "styled-components";
import BUURlogo from "../../assets/BUURLogo_sm.png";
import { useHistory } from "react-router-dom";

// 리덕스에 있는 state(데이터)를 props의 형태로 컴포넌트에 넣어주는 함수
const mapStateToProps = (state) => {
  return state;
};

// dispatch를 넘겨주는 함수
const mapDispatchToProps = (dispatch) => {
  return {
    userSignUp: (signUpInfo) => dispatch(action.userSignUp(signUpInfo)),
  };
};

const SignUpForm = ({ userSignUp }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function onChangeId(e) {
    setId(e.target.value);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function onChangeName(e) {
    setName(e.target.value);
  }
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    const signUpInfo = {
      id: id,
      password: password,
      name: name,
    };
    userSignUp(signUpInfo);
  }
  //로그인 페이지 이동
  const history = useHistory();

  const moveLogin = () => {
    history.replace("/");
  };
  return (
    <Container>
      <Jumbotron>
        <Logo></Logo>
      </Jumbotron>
      <Text>아이디</Text>
      <Input
        type="text"
        name="id"
        value={id}
        placeholder="아이디를 입력해주세요"
        onChange={onChangeId}
      />
      <Text>닉네임</Text>
      <Input
        type="text"
        name="name"
        value={name}
        placeholder="이름을 입력해주세요"
        onChange={onChangeName}
      />
      <Text>이메일</Text>
      <Input
        type="email"
        name="name"
        value={email}
        placeholder="이메일을 입력해주세요"
        onChange={onChangeEmail}
      />
      <Text>비밀번호</Text>
      <Input
        name="pwd"
        type="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangePassword}
      />
      <Text>비밀번호 확인</Text>
      <Input
        name="pwd"
        type="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangePassword}
      />
      <SignUpButton onClick={onSubmit}>회원가입</SignUpButton>
      <JoinText>
        이미 BUUR 회원이신가요? <Join onClick={moveLogin}>로그인</Join>
      </JoinText>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

/* CSS */
const Container = styled.div`
  margin-top: 120px;
  padding: 20px;
`;

const Jumbotron = styled.div`
  position: absolute;
  width: 360px;
  height: 116px;
  left: 0px;
  top: 0px;

  background: #ecc259;
`;

const Logo = styled.div`
  position: absolute;
  width: 169px;
  height: 66px;
  left: 96px;
  top: 22px;

  background: url(${BUURlogo});
  background-size: cover;
`;

const Input = styled.input`
  position: relative;
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

const Text = styled.div`
  font-weight: 600;
  height: 30px;
  margin: 0px 0 0px;
`;

const SignUpButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  background-color: rgba(177, 81, 32, 0.87);
  border-radius: 10px;
`;

const JoinText = styled.div`
  height: 30px;
  margin: 20px 0 0px;
  text-align: center;
`;

const Join = styled.a`
  font-weight: 600;
  color: rgba(233, 185, 64, 0.87);
  text-decoration: none;
`;
