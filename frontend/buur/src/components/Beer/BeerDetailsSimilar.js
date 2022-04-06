import axios from "axios";
import React, { useEffect, useState } from "react";
import BeerItem from "../../components/Beer/BeerItem";

const BeerDetailsSimilar = ( props ) => {
  const beerNo = props.beerNo;
  const [beerList, setBeerList] = useState([])

  const similarBeerList = async () => {
    await axios
    .get(`https://j6b102.p.ssafy.io/api-v1/beer/similar/${beerNo}`,
    {
      headers : {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
      })
      .then((res) => {
        setBeerList(res.data)
    })
  }
  
  useEffect(() => {
    similarBeerList();
  },[]);

  return (
    <div className="beerdetails-similar">
      <h3>이 맥주와 비슷해요</h3>
      <div className="similar-beerlist">
        {beerList.map((beer, index) => (
          <div key={index} className="similar-beeritem">
            <BeerItem beer={beer} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeerDetailsSimilar;
