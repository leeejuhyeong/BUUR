import React from "react";




class BeerReviewStar extends React.Component {
  render () {
    const beerRank = this.props.beerRank
    
    return (
      <div className="beerreview-star">
        <p>{beerRank.avg}</p>
        
      </div>
    )
  }
}

export default BeerReviewStar;