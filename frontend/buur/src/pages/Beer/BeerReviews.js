import React from "react";
import { useHistory, useLocation } from "react-router";
import BeerReviewBox from "../../components/Beer/BeerReviewBox";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../../styles/beerdetails.css';

const BeerReviews = () => {
  const location = useLocation();
  const beerName = location.state.beerName;
  const beerReviews = location.state.beerReviews;

  console.log(beerReviews)
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="beerreview-all">
      <header>
      <button onClick={goBack}><ChevronLeftIcon/></button>
        <p>{beerName}</p>
        <div></div>
      </header>
      <div className="beerreview-body">
      {beerReviews.map(( review , index) => (
          <BeerReviewBox
          key={index}
          review={review}
          />
      ))}
      </div>
    </div>
  )
}

export default BeerReviews;