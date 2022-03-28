import React from "react";

class BeerReviewBox extends React.Component {
  render () {
    const review = this.props.review
    return (
      <div className="beerreview-box">
        <div className="review-box__header">
          <p>{review.user}</p>
          <p>{review.review_rank}</p>
        </div>
        <div className="review-box__content">
          {review.review_content}
        </div>
      </div>
    )
  }
}

export default BeerReviewBox;