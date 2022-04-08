import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BUURlogo from "../../assets/BUUR_logo.svg";
import { fetchSignUp } from "./service";
import axios from "axios";

const SignUp = () => {
  const history = useHistory();
  const [timer, setTimer] = useState(0);
  const [nameTimer, setNameTimer] = useState(0);
  const [pwdBorderColor, setPwdBorderColor] = useState("solid 1px #dadada");
  const [pwBorderColor, setPwBorderColor] = useState("solid 1px #dadada");
  const [emailBorderColor, setEmailBorderColor] = useState("solid 1px #dadada");
  const [validEmail, setValidEmail] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [validPwConfirm, setValidPwConfirm] = useState(false);
  const [validId, setValidId] = useState();
  const [validName, setValidName] = useState();
  const [signUpAccount, setSignUpAccount] = useState({
    userEmail: "",
    userId: "",
    userNickname: "",
    userPassword: "",
  });

  const [pwdIdentify, setPwdIdentify] = useState({
    pwdIdentify: "",
  });

  useEffect(() => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(signUpAccount.userEmail)) {
      setEmailBorderColor("solid 1px #dadada");
      setValidEmail(true);
    } else if (signUpAccount.userEmail.length === 0) {
      setValidEmail("");
      setEmailBorderColor("solid 1px #dadada");
    } else {
      setEmailBorderColor("solid 1px #DB2B2B");
      setValidEmail(false);
    }

    if (
      signUpAccount.userPassword.length < 8 &&
      signUpAccount.userPassword.length > 0
    ) {
      setPwBorderColor("solid 1px #DB2B2B");
      setValidPw(false);
    } else if (signUpAccount.userPassword.length === 0) {
      setValidPw("");
      setPwBorderColor("solid 1px #dadada");
    } else {
      setPwBorderColor("solid 1px #dadada");
      setValidPw(true);
    }

    if (signUpAccount.userPassword === pwdIdentify.pwdIdentify) {
      setValidPwConfirm(true);
      setPwdBorderColor("solid 1px #dadada");
    } else if (signUpAccount.userPassword !== pwdIdentify.pwdIdentify) {
      setValidPwConfirm(false);
      setPwdBorderColor("solid 1px #DB2B2B");
    } else if (pwdIdentify.pwdIdentify.length === 0) {
      setValidPwConfirm("");
    }
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
      if (signUpStatus === 200) history.replace("/login");
    } catch (error) {
      window.alert(error);
    }
  };


  const moveLogin = () => {
    history.replace("/login");
  };

  function showIdCheck() {
    if (signUpAccount.userId.length > 0 && validId === false) {
      return <WarnText>이미 존재하는 닉네임입니다.</WarnText>;
    } else if (signUpAccount.userId.length > 0 && validId === true) {
      return <SuccessText>사용가능</SuccessText>;
    } else {
      return <WhiteDiv></WhiteDiv>;
    }
  }

  function showNameCheck() {
    if (signUpAccount.userNickname.length > 0 && validName === false) {
      return <WarnText>이미 존재하는 닉네임입니다.</WarnText>;
    } else if (signUpAccount.userNickname.length > 0 && validName === true) {
      return <SuccessText>사용가능</SuccessText>;
    } else {
      return <WhiteDiv></WhiteDiv>;
    }
  }

  function showEmailCheck() {
    if (validEmail === false) {
      return <WarnText>이메일 형식이 아닙니다</WarnText>;
    } else {
      return <WhiteDiv></WhiteDiv>;
    }
  }

  function showPwCheck() {
    if (validPw === false) {
      return <WarnText>8자 이상 입력해주세요</WarnText>;
    } else {
      return <WhiteDiv></WhiteDiv>;
    }
  }

  function showPwConfirmCheck() {
    if (validPwConfirm === false) {
      return <WarnText>입력한 비밀번호와 다릅니다.</WarnText>;
    } else {
      return <WhiteDiv></WhiteDiv>;
    }
  }

  function handleIdChange(id) {
    if (id.trim().length > 0) {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(async () => {
        try {
          await axios
            .get(`https://j6b102.p.ssafy.io/api-v1/user/id-check/${id}`, null)
            .then((res) => {
              if (res.data === true) {
                setValidId(false);
              } else {
                setValidId(true);
              }
            });
        } catch (e) {
          setValidId(false);
          console.error("error", e);
        }
      }, 500);
      setTimer(newTimer);
    }
  }

  function handleNameChange(name) {
    if (name) {
      if (nameTimer) {
        clearTimeout(nameTimer);
      }
      const newTimer = setTimeout(async () => {
        try {
          await axios
            .get(
              `https://j6b102.p.ssafy.io/api-v1/user/name-check/${name}`,
              null
            )
            .then((res) => {
              if (res.data === true) {
                setValidName(false);
              } else {
                setValidName(true);
              }
            });
        } catch (e) {
          setValidName(false);
          console.error("error", e);
        }
      }, 800);
      setNameTimer(newTimer);
    }
  }

  function validButton() {
    if (
      validEmail === true &&
      validPw === true &&
      validPwConfirm === true &&
      validId === true &&
      validName === true
    ) {
      return <SignUpButton onClick={onSubmit}>회원가입</SignUpButton>;
    } else {
      return <DisabledSignUpButton disabled>회원가입</DisabledSignUpButton>;
    }
  }

  return (
    <Container>
      <Jumbotron>
        <Logo src={BUURlogo}></Logo>
      </Jumbotron>
      <ContentBox>
      <Text>아이디</Text>
      <InputDiv>
        <Input
          type="text"
            name="userId"
            autoFocus
          placeholder="아이디를 입력해주세요"
          onChange={(e) => [
            onChangeSignUpAccount(e),
            handleIdChange(e.target.value),
          ]}
        />
      </InputDiv>
      {showIdCheck()}
      <Text>닉네임</Text>
      <NameInput
        type="text"
        name="userNickname"
        placeholder="이름을 입력해주세요"
        onChange={(e) => [
          onChangeSignUpAccount(e),
          handleNameChange(e.target.value),
        ]}
      />
      {showNameCheck()}
      <Text>이메일</Text>
      <EmailInput
        emailBorderColor={emailBorderColor}
        type="email"
        name="userEmail"
        placeholder="이메일을 입력해주세요"
        onChange={(e) => onChangeSignUpAccount(e)}
      />
      {showEmailCheck()}
      <Text>비밀번호</Text>
      <PwInput
        pwBorderColor={pwBorderColor}
        name="userPassword"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => onChangeSignUpAccount(e)}
      />
      {showPwCheck()}
      <Text>비밀번호 확인</Text>
      <PwdInput
        pwdBorderColor={pwdBorderColor}
        name="pwdIdentify"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={pwdInspect}
      />
      {showPwConfirmCheck()}
      {validButton()}
      <JoinText>
        이미 BUUR 회원이신가요? <Login onClick={moveLogin}>로그인</Login>
        </JoinText>
        </ContentBox>
    </Container>
  );
};

export default SignUp;


const Container = styled.div`
  display:flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 15px 28px 0px;

`

const Jumbotron = styled.div`
  width: 100%;
  height: 90px;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(233, 185, 64);
`;

const Logo = styled.img`
  width: 150px;
  margin-left: 15px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 38px;
  padding: 20px;

  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  &:focus {
    border: none;
    outline: 1px solid #e9b940;
  }
`;

const WarnText = styled.div`
  padding-bottom: 5px;
  color: #db2b2b;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
`;

const SuccessText = styled.div`
  padding-bottom: 5px;
  color: #008d06;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
`;

const NameInput = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  padding: 20px;

  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  &:focus {
    border: none;
    outline: 1px solid #e9b940;
  }
`;

const EmailInput = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  padding: 20px;

  border: ${(props) => props.emailBorderColor};
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  &:focus {
    border: none;
    outline: 1px solid #e9b940;
  }
`;

const PwInput = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  padding: 20px;

  border: ${(props) => props.pwBorderColor};
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
  font-weight: 600;
  font-size: 14px;
  height: 20px;
  margin-bottom: 5px;
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
  margin: 10px 0 0px;
  text-align: center;
  font-size: 13px;
`;

const Login = styled.a`
  font-weight: 600;
  color: rgb(233, 185, 64);
  text-decoration: none;
  cursor: pointer;
  `;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const WhiteDiv = styled.div`
  height: 15px;
`;

const DisabledSignUpButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  text-align: center;
  color: #fff;
  border: none;
  background-color: #b2b0b0;
  border-radius: 10px;
`;
