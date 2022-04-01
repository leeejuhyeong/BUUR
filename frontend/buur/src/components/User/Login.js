import styled from "styled-components";
import BUURlogo from "../../assets/BUURLogo_sm.png";
import GoogleLogo from "../../assets/GoogleLogo.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useUserContext } from "./user-context";
import { fetchLogin } from "./service";
import { useHistory } from "react-router-dom";

const Text = styled.div`
  font-weight: 600;
  height: 30px;
  margin: 20px 0 0px;
`;

const JoinText = styled.div`
  height: 30px;
  margin: 20px 0 0px;
  text-align: center;
`;

const Join = styled.a`
  font-weight: 600;
  color: rgba(177, 81, 32, 0.87);
  text-decoration: none;
`;

const PwdFind = styled.div`
  text-align: right;
  font-size: 11px;
  color: #000000;
  text-decoration: none;
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

const GoogleLogoInsert = styled.img`
  padding: 9px 20px 9px 5px;

  background: url(${GoogleLogo});
  background-size: cover;
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
  margin-top: 120px;
  padding: 20px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  padding: 20px;

  margin: 0 0 10px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
`;

const LoginButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 70px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  background-color: rgba(233, 185, 64, 0.87);
  border-radius: 10px;
`;

const GoogleLoginButton = styled.button`
  font-size: 17px;
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
  //글로벌 전역 상태값 setUser를 받아옴
  //로그인이 성공적으로 이루어지면 user에 상태값을 넣어줘야지 나중에 다른 컴포넌트에서도 user값을 이용하여 다른 것 들을 할 수 있음
  const { setUser } = useUserContext();

  //url 이동을 위한 useHistory
  const history = useHistory();

  //input에서 입력한 아이디와 비밀번호 정보를 담기위한 state
  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

  //input에 입력하면 자동적으로 account state값 변경
  const onChangeAccount = (e) => {
    //...을 이용하여 account의 복사본을 만들고
    //input에 지정한 네임 속성에 해당 value 값을 넣어 오버라이딩!
    //console.log(account)를 찍어보고 입력한 값들이 account에 출력되면 성공!!
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  //동기식으로 로그인정보를 통신하여 출력
  const onSubmitAccount = async () => {
    try {
      const user = await fetchLogin(account);

      //성공하면 해당 user 아이디 패스워드값 셋팅
      setUser(user);
      //성공하면 해당 url로 이동(main페이지로)
      history.replace("/SurveyInitialScreen");
    } catch (error) {
      //실패하면 throw new Error("") 값 출력
      window.alert(error);
    }
  };
  return (
    <Container>
      <Jumbotron>
        <Logo></Logo>
      </Jumbotron>
      <Text>아이디</Text>
      <Input id="id" name="id" placeholder="아이디를 입력해주세요" onChange={onChangeAccount} />
      <Text>비밀번호</Text>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangeAccount}
      />
      <Link textDecoration="none">
        <PwdFind>비밀번호를 잊어버리셨나요?</PwdFind>
      </Link>
      {/* <Link
        to={{
          pathname: "/SurveyInitialScreen",
          state: {
            keyword: "설문조사 초기화면",
          },
        }}
      > */}
      <LoginButton onClick={onSubmitAccount}>로그인</LoginButton>
      {/* </Link> */}
      <GoogleLoginButton>
        <GoogleLogoInsert></GoogleLogoInsert> Google 계정으로 계속
      </GoogleLoginButton>
      <JoinText>
        회원이 아니신가요?{" "}
        <Link
          to={{
            pathname: "/SignUp",
            state: {
              keyword: "회원가입",
            },
          }}
        >
          <Join>회원가입</Join>
        </Link>
      </JoinText>
    </Container>
  );
}

export default LoginForm;
