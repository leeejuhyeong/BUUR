import React, { useEffect } from "react";
import StarIcon from '@mui/icons-material/Star';

const BeerReviewStar = (props) => {
  const reviewScoreList = props.reviewScoreList
  const beerInfo = props.beerInfo
  let beerRank = {
    rankAvg: 0,
    totalCnt: 0,
    totalSum: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  useEffect(() => {
    getScoreList();
  }, [beerInfo])

  const getScoreList = () => {
    reviewScoreList.map((reviewScore, index) => {
      beerRank[reviewScore.score] = reviewScore.count
      beerRank.totalCnt += reviewScore.count
      beerRank.totalSum += reviewScore.score * reviewScore.count
    });
    
    if (beerRank.totalCnt !== 0) {
      beerRank.rankAvg = (beerRank.totalSum / beerRank.totalCnt).toFixed(1)
    };
  }
  getScoreList();

  const star = <StarIcon sx={{ fontSize: 9, color: '#616161' }} />
  
  return (
    <div className="beerreview-star">
      <p>{beerRank.rankAvg}</p>
      <div className="star-bar-5">
        <div>
          <div>{star}{star}{star}{star}{star}</div>
          <progress max={beerRank['totalCnt']} value={beerRank[5]}/>
        </div>
        <div>
          <div>{star}{star}{star}{star}</div>
          <progress max={beerRank.totalCnt} value={beerRank[4]}/>
        </div>
        <div>
          <div>{star}{star}{star}</div>
            <progress max={beerRank.totalCnt} value={beerRank[3]}/>
          </div>
        <div>
          <div>{star}{star}</div>
          <progress max={beerRank.totalCnt} value={beerRank[2]}/>
        </div>
        <div>
          <div>{star}</div>
          <progress max={beerRank.totalCnt} value={beerRank[1]}/></div>
      </div>
    </div>
  )
}

export default BeerReviewStar;