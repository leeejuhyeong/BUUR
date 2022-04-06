import React from "react";
import BasketBadge from "../../components/Basket/BasketBadge";
import "../../styles/beerheader.css";

class BeerHeader extends React.Component {
  render() {
    const pageInfo = this.props.pageInfo;
    return (
      <div className="beerheader">
        <div></div>
        <h4>{pageInfo}</h4>
        <BasketBadge />
      </div>
    );
  }
}

export default BeerHeader;
