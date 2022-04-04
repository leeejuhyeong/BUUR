import React from "react";
import {useHistory} from "react-router";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import axios from 'axios'


const BeerItem = (props) => {
  const history = useHistory();


  const beerDetails = async(beerInfo) => {
    await axios
    .get(`https://j6b102.p.ssafy.io/api-v1/beer/info/${beerInfo.beerNo}`, {
      headers: {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
    })
    .then((res) => {
      history.push({
        pathname: "/main/beerlist/beerdetails",
        state: { beerInfo : res.data }
      })
    }) 
  }

  const likeStatus = () => {
    if (props.beer.like) {
      return (
        <FavoriteRoundedIcon sx={{ color: '#CB0000', fontSize: 15 }}/>
      )
    } else {
      return (
        <FavoriteBorderRoundedIcon sx={{ color: '#CB0000', fontSize: 15 }}/>
      )
    }
  }

  return (
      <div className="beeritem" onClick={() => beerDetails(props.beer)}>
        <div className="like-status">
          <div></div>
            <img src={`data:image/png; base64, ${props.beer.beerImage}`} alt="beerImage" />
            {likeStatus()}
        </div>
        <p>{props.beer.beerName}</p>
      </div>
    )
}

export default BeerItem;