import React from "react";
import HomeHeader from "../components/Home/HomeHeader";
import HomeCarousel from '../components/Home/HomeCarousel';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from "react-router-dom";

import '../styles/home.css';

class Home extends React.Component {
  render () {
    const keyword = "전체 상품"

    return (
      <div className="home">
        <HomeHeader />
        <HomeCarousel />
        <Link to={{
          pathname: "/main/beerlist",
          state: {
            keyword: `${keyword}`
          }
        }}>
          전체 상품 보기 <ArrowRightIcon/>
        </Link>
      </div>
    )
  }
}

export default Home;