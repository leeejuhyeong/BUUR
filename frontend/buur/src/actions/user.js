import fetch from "isomorphic-fetch";
import { USER_SIGN_UP_RESULT } from "./ActionTypes";

export const userSignUp = (signUpInfo) => {
  return (dispatch) => {
    fetch("https://j6b102.p.ssafy.io/api-v1/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(signUpInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          dispatch(userSignUpResult(true));
        }
      })
      .catch((error) => dispatch(userSignUpResult(error)));
  };
};

export const userSignUpResult = (result) => {
  return {
    type: USER_SIGN_UP_RESULT,
    result,
  };
};
