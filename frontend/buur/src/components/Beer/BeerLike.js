import React, { useEffect, useState } from 'react';
import axios from 'axios'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const BeerLike = props => {
  const beerInfo = props.beerInfo
  const [like, setLike] = useState()
  
  useEffect(() => {
    updateLike()
  },[beerInfo, like])
  
  const updateLike = async() => {
    await axios
    .get(`https://j6b102.p.ssafy.io/api-v1/beer/info/${beerInfo.beerNo}`, {
      headers: {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
    })
    .then((res) => {
      setLike(like => res.data.like)
    }) 
  }

  const heart = () => {
    if (like) {
      return (
        <FavoriteRoundedIcon onClick={() => cancelLike()} sx={{ color: '#CB0000', fontSize: 22 }}/>
      )
    } else {
      return (
        <FavoriteBorderRoundedIcon onClick={() => makeLike()} sx={{ color: '#CB0000', fontSize: 22 }}/>
      )
    }
  }

  const makeLike = async () => {
    await axios
    .post(`https://j6b102.p.ssafy.io/api-v1/beer/like/${props.beerInfo.beerNo}`, null ,{
      headers: {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
    })
    .then(() => {
      setLike(true)
    })
    .catch(() => {
      alert('좋아요 실패!')
    })
  }

  const cancelLike = async () => {
    await axios
    .delete(`https://j6b102.p.ssafy.io/api-v1/beer/like/${props.beerInfo.beerNo}`, {
      headers: {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
    })
    .then((res) => {
      setLike(false)
    })
    .catch(() => {
      alert('좋아요 취소 실패!')
    })
  }


  return (
    <div >
      {heart()}
    </div>
  );
};

export default BeerLike;
