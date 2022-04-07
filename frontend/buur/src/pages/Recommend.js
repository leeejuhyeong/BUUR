import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeerHeader from "../components/Beer/BeerHeader";
import BeerItem from "../components/Beer/BeerItem";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../styles/beerrecommend.css";
import axios from "axios"
import Spinner from "../components/Spinner";

const Recommend = () => {
  const [originBeerList, setOriginBeerList] = useState([]);
  const [newBeerList, setNewBeerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  const isLoading = () => {
    if (loading) {
      return <Spinner />;
    }
  };

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/beer/new", {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setNewBeerList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/basket/drink/1", {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setOriginBeerList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function checkBeer() {
    if (originBeerList.length) {
      return (
        <div>
          <div className="most-favorite-div">
            <h4>즐겨찾는 맥주</h4>
            <Link
              className="show-all-recommend"
              to={{
                pathname: "/main/beerlist",
                state: {
                  keyword: "즐겨 찾는 맥주",
                },
              }}
            >
              {/* 전체 보기 <ChevronRightIcon fontSize="small" /> */}
            </Link>
          </div>
          <div className="most-favorite-list">
            {originBeerList.map((beer, index) => (
              <div key={index} className="most-favorite-item">
                <BeerItem beer={beer} />
                <div className="favorite-item-index">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      {isLoading()}
      <BeerHeader pageInfo="추천" />
      <div className="recommend-beer-page">
        {checkBeer()}
        <div className="recommend-beer-div">
          <h4>이런 맥주는 어떠세요?</h4>
        </div>
        <div className="recommend-beer-list">
          {newBeerList.map((beer, index) => (
            <div key={index} className="recommend-beer-item">
              <BeerItem beer={beer} />
              <div className="recommend-beer-index">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
