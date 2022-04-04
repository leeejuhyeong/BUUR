import React from "react";
import {useLocation} from "react-router";
import { Link } from "react-router-dom";
import {useHistory} from "react-router";

import BeerDetailsInfo from "../../components/Beer/BeerDetailsInfo";
import BeerReviewBox from "../../components/Beer/BeerReviewBox";
import BeerReviewStar from "../../components/Beer/BeerReviewStar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BeerDetailsSimilar from "../../components/Beer/BeerDetailsSimilar";
import '../../styles/beerdetails.css';

const BeerDetails = () => {
  const location = useLocation();
  const beerInfo = location.state.beerInfo;
  console.log(beerInfo)

  // beerInfo.id를 가지고 맥주 리뷰 조회 (평점도 얻을 수 있음)
  // const beerRank = { avg: 4.7, 1: 0, 2: 2, 3: 3, 4: 5, 5: 6}
  const beerRank = {
    rankAvg : beerInfo.reviewAvg,
    totalCnt : beerInfo.totalCnt,
    totalSum : beerInfo.totalSum,
    1: 0, 2: 2, 3: 3, 4: 5, 5: 6
  }
  const beerReviews = [
    { review_rank: 5, user: '싱글벙글', review_content: '자꾸자꾸 마시고 싶은 맥주!'},
    { review_rank: 5, user: '싱글벙글', review_content: '자꾸자꾸 마시고 싶은 맥주!'},
    { review_rank: 5, user: '싱글벙글', review_content: '자꾸자꾸 마시고 싶은 맥주!'},
    { review_rank: 5, user: '싱글벙글', review_content: '자꾸자꾸 마시고 싶은 맥주!'},
  ]

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="beerdetails">
      <header>
        <div></div>
        <p># {beerInfo.name}</p>
        <button onClick={goBack}><CloseRoundedIcon/></button>
      </header>
      <div className="beerdetails-body">
        <div className="beerdetails-body-info">
          <BeerDetailsInfo
          beerInfo={beerInfo}
          />
        </div>
        <hr/>
        <h3>평가 및 리뷰</h3>
        <BeerReviewStar 
        beerRank={beerRank}
        />
        <Link to={{
          pathname: "/main/beerlist/beerdetails/reviews",
          state: {
            beerName: `${beerInfo.name}`,
            beerReviews : beerReviews
          }
        }}
        className="show-all"
        >
        전체 리뷰 보기 <ChevronRightIcon fontSize="small"/>
        </Link>
        <div className="show-little">
          {beerReviews.slice(0,3).map(( review , index) => (
                <BeerReviewBox
                key={index}
                review={review}
                />
            ))}
        </div>
        {/* <hr/> */}
        <BeerDetailsSimilar
        beerRank={beerRank}
        />
      </div>
  </div>
  )
}

export default BeerDetails;