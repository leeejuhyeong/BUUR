import React from "react";
import bag from "../../assets/bag.png"
import '../../styles/beerheader.css'

class BeerHeader extends React.Component {
  render () {
    const pageInfo = this.props.pageInfo
    return (
      <div className="beerheader">
        <div></div>
        <h4>{pageInfo}</h4>
        <img src={bag} alt="bag"/>
      </div>
    )
  }
}

export default BeerHeader;