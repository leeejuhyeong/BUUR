import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from 'axios'
import BeerDetailsInfo from "../../components/Beer/BeerDetailsInfo";
import BeerReviewBox from "../../components/Beer/BeerReviewBox";
import BeerReviewStar from "../../components/Beer/BeerReviewStar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BeerDetailsSimilar from "../../components/Beer/BeerDetailsSimilar";
import "../../styles/beerdetails.css";

const BeerDetails = () => {
  const location = useLocation();
  const beerInfo = location.state.beerInfo;
  const cursor = new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').substring(0, 19);
  const [ beerReviews, setBeerReviews ] = React.useState([])
  

  useEffect(() => {
    getBeerReviews();
  }, [beerInfo])

  const getBeerReviews = async () => {
    await axios
    .get(`https://j6b102.p.ssafy.io/api-v1/beer/review/${beerInfo.beerNo}/${cursor}`,
      { headers: { "X-AUTH-TOKEN": localStorage.getItem('jwt') } })
    .then((res) => {
      setBeerReviews(res.data)
    })
  }

  const handleDelete = () => {
    getBeerReviews();
  }

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="beerdetails">
      <header>
        <div></div>
        <p># {beerInfo.name}</p>
        <button onClick={goBack}>
          <CloseRoundedIcon />
        </button>
      </header>
      <div className="beerdetails-body">
        <div className="beerdetails-body-info">
          <BeerDetailsInfo beerInfo={beerInfo} />
        </div>
        <hr />
        <h3>평가 및 리뷰</h3>
        <BeerReviewStar
          beerInfo = {beerInfo}
          reviewScoreList={beerInfo.reviewScoreList}
          />
        <Link
          to={{
            pathname: "/main/beerlist/beerdetails/reviews",
            state: {
              beerNo: `${beerInfo.beerNo}`,
              beerName: `${beerInfo.name}`,
            },
          }}
          className="show-all"
        >
          전체 리뷰 보기 <ChevronRightIcon fontSize="small" />
        </Link>
        <div className="show-little">
          {beerReviews.slice(0, 3).map((review, index) => (
            <BeerReviewBox key={index}
              beerNo={ beerInfo.beerNo }
              review={review}
              handleDelete={ handleDelete }/>
          ))}
        </div>
        <BeerDetailsSimilar beerNo={beerInfo.beerNo} />
      </div>
    </div>
  );
};

export default BeerDetails;
