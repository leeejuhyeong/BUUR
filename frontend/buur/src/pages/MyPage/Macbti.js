import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { RadialChart } from "react-vis";
import axios from "axios";

const Macbti = ({ history, location }) => {
  const image = location.state.image.image;
  const username = location.state.username.username;
  const [macbti, setMacbti] = useState("");
  const [userMonthData, setUserMonthData] = useState([]);
  const monthBeerList = userMonthData.map((beer) => beer.label);
  const [beerdata, setBeerdata] = useState([]);

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/beer/month", {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setBeerdata(res.data);
      })
      .catch((err) => console.log(err));

    const graphColor = ["#EED56B", "#E6A33A", "#E48C34", "#FFE578"];
    const newMonthDatas = [];
    const macbtiWord = [];
    if (beerdata.length === 4) {
      beerdata.forEach((value, index) => {
        const newMonthData = {
          angle: value.count,
          label: value.beerName,
          color: graphColor[index],
        };
        newMonthDatas.push(newMonthData);
        macbtiWord.push(value.beerName.substring(0, 1));
      });
      setMacbti(macbtiWord.join(""));
      setUserMonthData(newMonthDatas);
    }
  }, []);

  function moveMypage() {
    history.push({
      pathname: "/mypage",
    });
  }

  const fourbeer = () => {
    if (userMonthData.length) {
      return (
        <div>
          <span className="macbti-month-first">
            <p className="macbti-black-word">이번 달&nbsp;</p>
            <p className="macbti-brown-word">MacBTI&nbsp;</p>
            <p className="macbti-black-word">는</p>
          </span>
          <span className="macbti-month-second">
            <p className="macbti-brown-word">{macbti}</p>
            <p className="macbti-black-word">입니다.</p>
          </span>
          <div className="macbti-graph">
            <RadialChart
              data={userMonthData}
              width={210}
              height={210}
              colorType="literal"
            />
          </div>
          <div className="four-beer-div">
            <div className="circle-list">
              <span className="beer-name">
                <div className="circle1"></div>
                <span className="beer-name">{monthBeerList[0]}</span>
              </span>
              <span className="beer-name">
                <div className="circle2"></div>
                <span>{monthBeerList[1]}</span>
              </span>
            </div>
            <div className="circle-list">
              <span className="beer-name">
                <div className="circle3"></div>
                <span className="beer-name">{monthBeerList[2]}</span>
              </span>
              <span className="beer-name">
                <div className="circle4"></div>
                <span>{monthBeerList[3]}</span>
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <span className="macbti-month-first">
            <p className="macbti-black-word">이번 달&nbsp;</p>
            <p className="macbti-brown-word">MacBTI&nbsp;</p>
            <p className="macbti-black-word">는</p>
          </span>
          <span className="macbti-month-second">
            <p className="macbti-black-word">아직 없습니다.</p>
          </span>
          <span className="macbti-month-first">
            <span className="macbti-brown-word">냉장고</span>
            <span className="macbti-black-word">에서</span>
          </span>
          <span className="macbti-month-second">
            <p className="macbti-black-word">나만의 맥주를 조합해보세요</p>
          </span>
          <div className="macbti-graph"></div>
        </div>
      );
    }
  };

  return (
    <div className="macbti-page ">
      <div className="macbti-header">
        <div></div>
        <p>MacBTI</p>
        <Button component="span" onClick={() => moveMypage()}>
          <CloseRoundedIcon sx={{ color: "#ffffff" }} />
        </Button>
      </div>
      <div className="macbti-content">
        <div className="macbti-user-info">
          <img
            src={`data:image/png;base64,${image}`}
            alt="프로필 사진"
            className="profile-img"
          />
          {username}님
        </div>
        <div className="macbti-notice">Macbti란?</div>
        <div className="macbti-graph-div">
          {fourbeer()}

          <div className="refrigerator-icon-div">
            <Button variant="contained" className="refrigerator-btn">
              냉장고 둘러보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Macbti;
