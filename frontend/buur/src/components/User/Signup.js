// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import * as action from "../../actions/index";

// const SignUp = ({ userReducer, userSignUp }) => {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   function onChangeId(e) {
//     setId(e.target.value);
//   }
//   function onChangePassword(e) {
//     setPassword(e.target.value);
//   }
//   function onChangeName(e) {
//     setName(e.target.value);
//   }
//   function onSubmit(e) {
//     e.preventDefault();
//     const signUpInfo = {
//       id: id,
//       password: password,
//       name: name,
//     };
//     userSignUp(signUpInfo);
//   }

//   return (
//     <>
//       <h1>SignUp.js</h1>
//       <form>
//         <input
//           type="text"
//           name="id"
//           value={id}
//           onChange={onChangeId}
//           placeholder="ID를 입력하세요"
//         />
//         <input
//           type="password"
//           name="pwd"
//           value={password}
//           onChange={onChangePassword}
//           placeholder="비밀번호를 입력하세요"
//         />
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={onChangeName}
//           placeholder="이름을 입력하세요"
//         />
//         <button onClick={onSubmit}>SIGN UP</button>
//       </form>
//     </>
//   );
// };

// // 리덕스에 있는 state(데이터)를 props의 형태로 컴포넌트에 넣어주는 함수
// const mapStateToProps = (state) => {
//   return state;
// };

// // dispatch를 넘겨주는 함수
// const mapDispatchToProps = (dispatch) => {
//   return {
//     userSignUp: (signUpInfo) => dispatch(action.userSignUp(signUpInfo)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
