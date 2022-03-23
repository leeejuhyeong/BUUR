import React from "react";
// import Carousel from 'react-material-ui-carousel';
import bannerImg1 from "../../assets/banner_chicken.png";
import bannerImg2 from "../../assets/banner_react.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class HomeCarousel extends React.Component {
  render() {
    return (
        <Carousel autoPlay showThumbs={false} showStatus={false} infiniteLoop>
            <div className="carouselImage">
                <img src={bannerImg1} alt="banner1" />
            </div>
            <div className="carouselImage">
                <img src={bannerImg2} alt="banner2"/>
            </div>
        </Carousel>
    );
  }
}


export default HomeCarousel;