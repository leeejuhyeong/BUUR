export const fetchLogin = async ({ id, password }) => {
  const data = { userId: id, userPassword: password };
  return fetch("https://j6b102.p.ssafy.io/api-v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const JWT = await res.text();
    // console.log(JWT);
    if ((await JWT) === "fail") throw new Error("아이디와 비밀번호를 확인해주세요.");
    else return JWT;
  });
  // awt = await AWT;
  // console.log(await res.text());
  // if ((await res.text()) === "fail") alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  // else {
  //   const AWT = res.text();
  //   AWT return;
  // }
  // else {
  //   history.replace("/SurveyInitialScreen");
  // }

  // console.log(await awt);
  // fetch("http://localhost:8080/api-v1/user/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.text())

  //   .then(function (response) {
  //     console.log(response);

  // const users = response.text();
  // const user = users.find((user) => user.id === id);
  // if (!user || user.password !== password) {
  // if (response === "fail") alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  // }
  // return user;
  // });
  // .catch((err) => console.log(err));

  // const response = await fetch("http://localhost:8080/api-v1/user/login");

  //   if (response.ok) {
  //     //서버통신이 성공적으로 이루어지면 users에 json값 대입
  //     const users = await response.json();

  //     //users안 객체들을 순회하면서 그 객체들의 id값과 form 컴포넌트에서 받음 account의 id값과 비교
  //     //서로 일치하는 것만 user에 대입
  //     const user = users.find((user) => user.id === id);
  //     //일치하는 user가 없거나, 비밀번호가 틀리면 해당 에러 생성
  //     if (!user || user.password !== password) {
  //       throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  //     }

  //     //모든게 일치하면 그 user 정보 return -> 이 return값이 form 컴포넌트 내 fetchLogin 함수 값으로 출력되는것
  //     //form 컴포넌트에서 setUser값에 넣어야함
  //     return user;
  //   }

  //   // 서버 통신이 안이루어졌을떄
  //   throw new Error("서버 통신이 원할하지 않습니다.");
};
// Example POST method implementation:

// postData("http://localhost:8080/api-v1/user/login", { userId: id, userPassword: password })
//   .then((data) => console.log(data)) // JSON-string from `response.json()` call
//   .catch((error) => console.error(error));

// function postData(url = "", data = {}) {
//   return fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   }).then((response) => response.text()); // parses JSON response into native JavaScript objects
// }
// var awt;
