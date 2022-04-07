import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/BUUR_logo.svg";
import BasketBadge from "../Basket/BasketBadge";

class HomeHeader extends React.Component {
  render() {
    return (
      <div className="homeheader">
        <div></div>
        <img src={LogoImg} alt="logo" />
        <Link to="main/basket">
          <BasketBadge />
        </Link>
      </div>
    );
  }
}

export default HomeHeader;
