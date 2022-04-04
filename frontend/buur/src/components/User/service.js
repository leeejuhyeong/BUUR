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
    // console.log(loginStatus);
    const JWT = await res.text();

    if (loginStatus === 200) return JWT;
    else throw new Error("아이디와 비밀번호를 확인해주세요.");
    // console.log(JWT);
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

export { fetchLogin, fetchBeerList };
