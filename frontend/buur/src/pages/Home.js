import React from "react";
import HomeHeader from "../components/Home/HomeHeader";
import HomeCarousel from '../components/Home/HomeCarousel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";

import lager from "../assets/beer_icon/lager_icon.png";
import ale from "../assets/beer_icon/ale_icon.png";
import darkbeer from "../assets/beer_icon/darkbeer_icon.png";
import pilsner from "../assets/beer_icon/pilsner_icon.png";
import wheatbeer from "../assets/beer_icon/wheatbeer_icon.png";
import etcbeer from "../assets/beer_icon/etcbeer_icon.png";
import '../styles/home.css';
import '../styles/beerlist.css';

class Home extends React.Component {
  render () {
    return (
      <div className="home">
        <HomeHeader />
        <HomeCarousel />
        <Link
        className="show-all"
        to={{
          pathname: "/main/beerlist",
          state: {
            keyword: "전체 상품"
          }
        }}>
          전체 상품 보기 <ChevronRightIcon fontSize="small"/>
        </Link>

        <div className="beer-sortbar">
          <div className="sort-btn" >
            <Link
              className="sort-img"
              to={{
              pathname: "/main/beerlist",
              state: {
                keyword: "라거"
              }}}>
              <img src={lager} alt='lager'/>
            </Link>
            <p>라거</p>
          </div>
          <div className="sort-btn" >
            <Link
              className="sort-img"
              to={{
              pathname: "/main/beerlist",
              state: {
                keyword: "에일"
              }}}>
              <img src={ale} alt='lager'/>
            </Link>
            <p>에일</p>
          </div>
          <div className="sort-btn" >
            <Link
            className="sort-img"
              to={{
              pathname: "/main/beerlist",
              state: {
                keyword: "흑맥주"
              }}}>
              <img src={darkbeer} alt='lager'/>
            </Link>
            <p>흑맥주</p>
          </div>
          <div className="sort-btn" >
            <Link
            className="sort-img"
              to={{
              pathname: "/main/beerlist",
              state: {
                keyword: "필스너"
              }}}>
              <img src={pilsner} alt='lager'/>
            </Link>
            <p>필스너</p>
          </div>
          <div className="sort-btn" >
            <Link
            className="sort-img"
              to={{
              pathname: "/main/beerlist",
              state: {
                keyword: "밀맥주"
              }}}>
              <img src={wheatbeer} alt='lager'/>
            </Link>
            <p>밀맥주</p>
          </div>
          <div className="sort-btn" >
            <Link
            className="sort-img"
              to={{
              pathname: "/main/beerlist",
              state: {
                keyword: "기타"
              }}}>
              <img src={etcbeer} alt='lager'/>
            </Link>
            <p>기타</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;