import React, { useState, useEffect } from "react";
import MyPageHeader from "../../components/MyPage/MyPageHeader";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../styles/mypage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function MyPage() {
  // 유저이미지, 이름 설정
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/user/info", {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setUsername(res.data.userNickname);
        setImage(res.data.userProfile);
        setUseremail(res.data.userEmail);
      })
      .catch((err) => console.log(err));
  }, [image]);

  function logout() {
    localStorage.removeItem("jwt");
  }

  return (
    <div className="mypage">
      <MyPageHeader pageInfo="마이페이지" />
      <div>
        <Link
          className="user-info-div"
          to={{
            pathname: "/mypage/userinfo",
            state: {
              image: { image },
              username: { username },
              useremail: { useremail },
            },
          }}
        >
          <div className="user-info-div">
            <img
              src={`data:image/png;base64,${image}`}
              alt="프로필 사진"
              className="profile-img"
            />
            {username}님
          </div>
          <ArrowForwardIosIcon
            className="info-arrow-icon"
            sx={{ fontSize: 16 }}
          />
        </Link>
        <Link
          className="macbti-div"
          to={{
            pathname: "/mypage/macbti",
            state: {
              image: { image },
              username: { username },
            },
          }}
        >
          나의 MacBTI 는?
        </Link>
        <Link
          className="mypage-el-div"
          to={{
            pathname: "/mypage/refrigerator",
          }}
        >
          냉장고 둘러보기
        </Link>
        <Link
          className="mypage-el-div"
          to={{
            pathname: "/mypage/likebeer",
          }}
        >
          찜한 맥주
        </Link>
        <Link
          className="mypage-el-div"
          to={{
            pathname: "/mypage/notice",
          }}
        >
          공지사항
        </Link>
        <div className="logout-div" onClick={() => logout()}>
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default MyPage;
