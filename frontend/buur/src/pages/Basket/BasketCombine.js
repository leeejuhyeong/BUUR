import React from "react";
import BasketCombineBack from "../../components/Basket/BasketCombineBack";
import {useLocation} from "react-router";
import "../../styles/beerbasketcombine.css";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import store from "../../store";
import axios from "axios";
import { VACATE_BASKET } from "../../actions/ActionTypes";

function BasketCombine () {
  const location = useLocation();
  const combineBeer = location.state.combineBeer;
  const history = useHistory();
  
  const addRefrigerator = async () => {
    const basketList = store.getState().beer.basket
    const sendBeers = basketList.map((beer) => {
      return { "beerId" : beer.beerNo }
    })
    console.log(sendBeers)
    await axios.post(`https://j6b102.p.ssafy.io/api-v1/basket`, sendBeers , {
      headers : { 'X-AUTH-TOKEN' : localStorage.getItem('jwt')}
    })
      .then(() => {
        store.dispatch({type: VACATE_BASKET })
      // 냉장고페이지로 이동해야됨
    })
  }

  return (
    <div className="basket-combine">
      <div className="basket-combine-content">
      <div className="basket-combine-beers">
        { combineBeer.map((beer, index)=> (
          <img src={`data:image/png; base64, ${beer.beerImage}`} key={index} alt="beer"/>
        ))}
      </div>
      <Typography sx={{ fontSize: 30, color: 'white', display: 'flex', justifyContent: 'center', m: 4}}>에게~</Typography>
      <button onClick={addRefrigerator}>냉장고에 담을래요</button>
      <button onClick={() => history.goBack()}>다시 조합할래요</button>
      </div>
      <BasketCombineBack/>
    </div>
  )
}

export default BasketCombine;