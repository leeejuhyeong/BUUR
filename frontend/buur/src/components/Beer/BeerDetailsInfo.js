import React from "react";
import beerImg from "../../assets/beer_sample.png";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';

class BeerDetailsInfo extends React.Component {
  render () {
    const beerInfo = this.props.beerInfo
    return (
      <div className="beer-details-info">
        <img src={beerImg} alt="beerImg"/>
        <div className="beer-textinfo">
          <div className="beer-textinfo__title">
            <h3>{beerInfo.name}</h3>
            <FavoriteBorderRoundedIcon sx={{ color: '#CB0000', fontSize: 22 }}/>
          </div>
          <div><h5>알코올</h5> <span>{beerInfo.alcohol}</span></div>
          <div><h5>종류 </h5> <span>{beerInfo.kind}</span></div>
          <div><h5>원산지 </h5> <span>{beerInfo.origin}</span></div>
          <button><WorkOutlineRoundedIcon sx={{ fontSize: 20, mx:0.5}}/>이 맥주 마시고 싶어요!</button>
        </div>
      </div>
    )
  }
}

export default BeerDetailsInfo;