import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BUURlogo from "../../assets/BUURLogo_sm.png";
import { fetchSignUp } from "./service";

const SignUp = () => {
  const history = useHistory();
  const [pwdBorderColor, setPwdBorderColor] = useState("solid 1px #dadada");
  const [signUpAccount, setSignUpAccount] = useState({
    userEmail: "",
    userId: "",
    userNickname: "",
    userPassword: "",
  });
  // const [pwdIdentify, setPwdIdentify] = useState("");
  const [pwdIdentify, setPwdIdentify] = useState({
    pwdIdentify: "",
  });

  useEffect(() => {
    console.log(signUpAccount.userPassword);
    console.log(pwdIdentify.pwdIdentify);

    if (signUpAccount.userPassword !== pwdIdentify.pwdIdentify)
      setPwdBorderColor("solid 1px #DB2B2B");
    else if (signUpAccount.userPassword === pwdIdentify.pwdIdentify)
      setPwdBorderColor("solid 1px #dadada");
  }, [pwdIdentify, signUpAccount]);

  const onChangeSignUpAccount = (e) => {
    setSignUpAccount({ ...signUpAccount, [e.target.name]: e.target.value });
  };

  const pwdInspect = (e) => {
    setPwdIdentify({ ...pwdIdentify, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      let signUpStatus;
      if (signUpAccount.userPassword === pwdIdentify.pwdIdentify) {
        signUpStatus = await fetchSignUp(signUpAccount);
      } else throw new Error("비밀번호를 확인해주세요.");
      if (signUpStatus === 200) history.replace("/");
    } catch (error) {
      window.alert(error);
    }
  };

  //로그인 페이지 이동
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
        name="userId"
        placeholder="아이디를 입력해주세요"
        onChange={onChangeSignUpAccount}
      />
      <Text>닉네임</Text>
      <Input
        type="text"
        name="userNickname"
        placeholder="이름을 입력해주세요"
        onChange={onChangeSignUpAccount}
      />
      <Text>이메일</Text>
      <Input
        type="email"
        name="userEmail"
        placeholder="이메일을 입력해주세요"
        onChange={onChangeSignUpAccount}
      />
      <Text>비밀번호</Text>
      <Input
        name="userPassword"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangeSignUpAccount}
      />
      <Text>비밀번호 확인</Text>
      <PwdInput
        pwdBorderColor={pwdBorderColor}
        name="pwdIdentify"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={pwdInspect}
      />
      <SignUpButton onClick={onSubmit}>회원가입</SignUpButton>
      <JoinText>
        이미 BUUR 회원이신가요? <Login onClick={moveLogin}>로그인</Login>
      </JoinText>
    </Container>
  );
};

export default SignUp;

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

  background: rgb(233, 185, 64);
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
const PwdInput = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  padding: 20px;

  margin: 0 0 20px;
  border: ${(props) => props.pwdBorderColor};
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  &:focus {
    border: none;
    outline: 1px solid #e9b940;
  }
`;
const Text = styled.div`
  font-weight: 500;
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
  background-color: rgb(177, 81, 32);
  border-radius: 10px;
`;

const JoinText = styled.div`
  height: 30px;
  margin: 20px 0 0px;
  text-align: center;
`;

const Login = styled.a`
  font-weight: 600;
  color: rgb(233, 185, 64);
  text-decoration: none;
`;
