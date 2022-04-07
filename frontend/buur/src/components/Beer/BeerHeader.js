import React from "react";
import { Link } from "react-router-dom";
import BasketBadge from "../../components/Basket/BasketBadge";
import "../../styles/beerheader.css";

class BeerHeader extends React.Component {
  render() {
    const pageInfo = this.props.pageInfo;
    return (
      <div className="beerheader">
        <div></div>
        <h4>{pageInfo}</h4>
        <Link to="main/basket">
          <BasketBadge />
        </Link>
      </div>
    );
  }
}

export default BeerHeader;
