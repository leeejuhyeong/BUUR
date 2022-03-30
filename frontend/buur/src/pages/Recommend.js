import React from "react";
import { Link } from "react-router-dom";
import BeerHeader from "../components/Beer/BeerHeader";
import BeerItem from "../components/Beer/BeerItem";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../styles/beerrecommend.css'

class Recommend extends React.Component {
  render () {
  const beerList = [
    { name : '호가든', id:'a', kind:'과일맥주', alcohol:'4.5', origin: '덴마크' },
    { name : '서머스비', id:'b', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'c', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'d', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'e', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'f', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
  ]

  return (
    <div>
      <BeerHeader
      pageInfo='추천'
      />
      <div className="recommend-beer-page">
        <div className="most-favorite-div">
          <h4>즐겨찾는 맥주</h4>
          <Link
            className="show-all-recommend"
            to={{
              pathname: "/main/beerlist",
              state: {
                keyword: "즐겨 찾는 맥주"
              }
            }}>
              전체 보기 <ChevronRightIcon fontSize="small"/>
          </Link>
        </div>
        <div className="most-favorite-list">
          {beerList.map(( beer , index) => ( 
            <div key={index} className="most-favorite-item">
              <BeerItem
              beer={beer}
              />
              <div className="favorite-item-index">{index+1}</div>
            </div>
          ))}
        </div>
        <div className="recommend-beer-div">
          <h4>이런 맥주는 어떠세요?</h4>
        </div>
        <div className="recommend-beer-list">
          {beerList.map(( beer , index) => ( 
            <div key={index} className="recommend-beer-item">
              <BeerItem
              beer={beer}
              />
              <div className="recommend-beer-index">{index+1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  }
}

export default Recommend;