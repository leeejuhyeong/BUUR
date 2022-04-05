import React, { useEffect } from "react";
import SportsBarRoundedIcon from '@mui/icons-material/SportsBarRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import store from '../../store';
import axios from 'axios';

const BeerReviewBox = (props) => {
  const review = props.review
  const loginUser = store.getState().beer.userInfo.userNickname

  const deleteReview = async (reviewNo) => {
    console.log('삭제하고싶은 리뷰:', reviewNo)
    await axios.delete(`https://j6b102.p.ssafy.io/api-v1/beer/review/${reviewNo}`, {
      headers: { 'X-AUTH-TOKEN' : localStorage.getItem('jwt')}
    })
      .then((res) => {
        console.log(res.data)
    })
  }
  
  const reviewHeader = () => {
    if (review.userNickName === loginUser) {
      return (
        <div className="review-box__trash">
          <div className="review-header-left">
            <p className="review-box__user">{review.userNickName}</p>
            <SportsBarRoundedIcon sx={{ fontSize: 17, ml: 0.8, color: '#E9B940' }} />
            <p className="review-box__rank">{review.rank}</p>
          </div>
          <DeleteRoundedIcon
            onClick={() => deleteReview(review.reviewNo)}
            sx={{ fontSize: 15, m: 0.3 }} />
        </div>
      )
    } else {
      return (
        <div className="review-box__header">
          <p className="review-box__user">{review.userNickName}</p>
          <SportsBarRoundedIcon sx={{ fontSize: 17, m : 0, color: '#E9B940' }}/>
          <p className="review-box__rank">{review.rank}</p>
        </div>
      )
    }
  }

  return (
    <div className="beerreview-box">
      { reviewHeader() }
      <div className="review-box__content">
        {review.content}
      </div>
    </div>
  )
}

export default BeerReviewBox;