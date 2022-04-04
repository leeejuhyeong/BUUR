import React from "react";
import StarIcon from '@mui/icons-material/Star';

class BeerReviewStar extends React.Component {
  render () {
    const beerRank = this.props.beerRank
    const star = <StarIcon sx={{fontSize: 9, color: '#616161'}}/>
    return (
      <div className="beerreview-star">
        <p>{beerRank.rankAvg}</p>
        <div className="star-bar-5">
          <div>
            <div>{star}{star}{star}{star}{star}</div>
            <progress max="100" value={beerRank[5]*10}/>
          </div>
          <div>
            <div>{star}{star}{star}{star}</div>
            <progress max="100" value={beerRank[4]*10}/>
          </div>
          <div>
            <div>{star}{star}{star}</div>
              <progress max="100" value={beerRank[3]*10}/>
            </div>
          <div>
            <div>{star}{star}</div>
            <progress max="100" value={beerRank[2]*10}/>
          </div>
          <div>
            <div>{star}</div>
            <progress max="100" value={beerRank[1]*10}/></div>
        </div>
      </div>
    )
  }
}

export default BeerReviewStar;