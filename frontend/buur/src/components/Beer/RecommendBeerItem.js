import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import axios from "axios";

const RecommendBeerItem = (props) => {
  const history = useHistory();
  const [beerInfo, setBeerInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://j6b102.p.ssafy.io/api-v1/beer/info/${props.beer.beerId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setBeerInfo(res.data);
      });
  }, []);

  const beerDetails = () => {
    history.push({
      pathname: "/main/beerlist/beerdetails",
      state: { beerInfo: beerInfo },
    });
  };
  const likeStatus = () => {
    if (beerInfo.like) {
      return <FavoriteRoundedIcon sx={{ color: "#CB0000", fontSize: 15 }} />;
    } else {
      return (
        <FavoriteBorderRoundedIcon sx={{ color: "#CB0000", fontSize: 15 }} />
      );
    }
  };

  return (
    <div className="beeritem" onClick={() => beerDetails(beerInfo)}>
      <div className="like-status">
        <div></div>
        <img
          src={`data:image/png; base64, ${props.beer.beerImage}`}
          alt="beerImage"
        />
        {likeStatus()}
      </div>
      <p>{props.beer.beerName}</p>
    </div>
  );
};

export default RecommendBeerItem;
