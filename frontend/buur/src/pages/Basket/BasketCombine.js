import React from "react";
import BasketCombineBack from "../../components/Basket/BasketCombineBack";
import {useLocation} from "react-router";
import "../../styles/beerbasketcombine.css";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

function BasketCombine () {
  const location = useLocation();
  const combineBeer = location.state.combineBeer;

  const history = useHistory()

  return (
    <div className="basket-combine">
      <div className="basket-combine-content">
      <div>
        { combineBeer.map((beer, index)=> (
          <img src={beer.img} key={index} alt="beer"/>
        ))}
      </div>
      <Typography sx={{ fontSize: 30, color: 'white', display: 'flex', justifyContent: 'center', m: 4}}>에게~</Typography>
      <button>냉장고에 담을래요</button>
      <button onClick={() => history.goBack()}>다시 조합할래요</button>
      </div>
      <BasketCombineBack/>
    </div>
  )
}

export default BasketCombine;