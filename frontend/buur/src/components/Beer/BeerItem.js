import React from "react";
import {useHistory} from "react-router";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import beerImg from '../../assets/beer_sample.png'


const BeerItem = (props) => {
  const history = useHistory();

  function beerDetails(beerInfo) {
    // beerId에 맞는 맥주 상세정보 조회
  
    history.push({
      pathname: "/main/beerlist/beerdetails",
      state: {beerInfo : beerInfo}
    })
  }

  return (
      <div className="beeritem" onClick={() => beerDetails(props.beer)}>
        <div className="like-status">
          <div></div>
          <img src={beerImg} alt="beerSample" />
          <FavoriteBorderRoundedIcon sx={{ color: '#CB0000', fontSize: 15 }}/>
        </div>
        <p>{props.beer.name}</p>
      </div>
    )
}

export default BeerItem;