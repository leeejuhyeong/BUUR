import React from "react";
import BasketCombineBack from "../../components/Basket/BasketCombineBack";
import { useLocation } from "react-router";
import "../../styles/beerbasketcombine.css";
import { useHistory } from "react-router-dom";
import store from "../../store";
import axios from "axios";
import { VACATE_BASKET } from "../../actions/ActionTypes";

function BasketCombine() {
  const location = useLocation();
  const combineBeer = location.state.combineBeer;
  const history = useHistory();

  const addRefrigerator = async () => {
    const basketList = store.getState().beer.basket;
    const sendBeers = basketList.map((beer) => {
      return { beerId: beer.beerNo };
    });
    console.log(sendBeers);
    await axios
      .post(`https://j6b102.p.ssafy.io/api-v1/basket`, sendBeers, {
        headers: { "X-AUTH-TOKEN": localStorage.getItem("jwt") },
      })
      .then(() => {
        store.dispatch({ type: VACATE_BASKET });
        history.push({
          pathname: "/mypage/refrigerator",
        });
      });
  };

  const BasketContext = () => {
    const BasketText = require('../../components/Basket/BasketText.json');
    const num = Math.floor(Math.random() * 21);
    console.log(num)
    const res = BasketText[num].content.split('\n').map((line, index) => {
      return (<p className="basket-text-content" key={ index }>{ line }<br/></p>)
    })
    
    return (
      <div className="basket-text-box">
        { res }
        <p className="basket-text-talker">- { BasketText[num].talker} -</p>
      </div>
    )
  }


  return (
    <div className="basket-combine">
      <div className="basket-combine-content">
        <div className="basket-combine-beers">
          {combineBeer.map((beer, index) => (
            <img
              src={`data:image/png; base64, ${beer.beerImage}`}
              key={index}
              alt="beer"
            />
          ))}
        </div>
        { BasketContext() }
        <button onClick={addRefrigerator}>냉장고에 담을래요</button>
        <button onClick={() => history.goBack()}>다시 조합할래요</button>
      </div>
      <BasketCombineBack />
    </div>
  );
}

export default BasketCombine;
