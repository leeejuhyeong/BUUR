import React from "react";
import bannerImg1 from "../../assets/banner/banner_chicken.svg";
import bannerImg2 from "../../assets/banner/banner_pizza.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class HomeCarousel extends React.Component {
  render() {
    return (
        <Carousel autoPlay showThumbs={false} showStatus={false} showArrows={false} infiniteLoop >
            <div className="carouselImage">
                <img className="carouselImage1" src={bannerImg1} alt="banner1" />
            </div>
            <div className="carouselImage">
                <img className="carouselImage2" src={bannerImg2} alt="banner2"/>
            </div>
        </Carousel>
    );
  }
}


export default HomeCarousel;