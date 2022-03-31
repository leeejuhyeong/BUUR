import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/BUURLogo_sm.png"
import BasketBadge from "../Basket/BasketBadge"

class HomeHeader extends React.Component {
  render () {
    return (
      <div className="homeheader">
      <div></div>
      <img src={logo} alt="logo"/>
      <Link to="main/basket">
        <BasketBadge />
      </Link>
      </div>
    )
  }
}

export default HomeHeader;