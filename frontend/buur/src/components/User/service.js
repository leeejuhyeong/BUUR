const fetchLogin = async ({ id, password }) => {
  const data = { userId: id, userPassword: password };
  return fetch("https://j6b102.p.ssafy.io/api-v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const loginStatus = res.status;
    const JWT = await res.text();
    if (loginStatus === 200) return JWT;
    else throw new Error("아이디와 비밀번호를 확인해주세요.");
  });
};

const fetchSignUp = async (signUpAccount) => {
  return fetch("https://j6b102.p.ssafy.io/api-v1/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpAccount),
  }).then(async (res) => {
    if (res.status === 200) return res.status;
    else throw new Error("입력하신 내용을 확인해주세요.");
  });
};

const fetchBeerList = async () => {
  return fetch("https://j6b102.p.ssafy.io/api-v1/beer", {
    method: "GET",
    headers: {
      "X-AUTH-TOKEN": localStorage.getItem("jwt"),
    },
  }).then(async (res) => {
    return await res.json();
  });
};

const fetchUserInfo = async () => {
  return fetch("https://j6b102.p.ssafy.io/api-v1/user/status", {
    method: "GET",
    headers: {
      "X-AUTH-TOKEN": localStorage.getItem("jwt"),
    },
  }).then(async (res) => {
    return await res.text();
  });
};

const fetchSurveyReview = async (reviewList) => {
  return fetch("https://j6b102.p.ssafy.io/api-v1/user/survey", {
    method: "POST",
    headers: {
      "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewList),
  }).then(async (res) => {
    return await res.status;
  });
};
export {
  fetchLogin,
  fetchBeerList,
  fetchUserInfo,
  fetchSurveyReview,
  fetchSignUp,
};
