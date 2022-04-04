import styled from "styled-components";
import BUURlogo from "../../assets/BUURLogo_sm.png";
import GoogleLogo from "../../assets/GoogleLogo.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useUserContext } from "./user-context";
import { fetchLogin } from "./service";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ADD_BASKET } from "../../actions/ActionTypes";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return <SignUpForm></SignUpForm>;
}

export default SignUp;

/* CSS */
const Text = styled.div`
  font-weight: 600;
  height: 30px;
  margin: 20px 0 0px;
`;
