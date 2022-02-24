import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import NoImage from "../../images/No-image.jpg";
import NoImageArabic from "../../images/No-image-arabic.jpg";
import "./style.css";
import Card from "../Card";
import { RiStarSFill } from "react-icons/ri";
import { BaseUrl } from "../../config/api/_Domain";
import { IoIosFlash } from "react-icons/io";

export default function CardSlider(props) {
  const { title } = props;
  const shops = [1,2,3,4,5,6,7,8,9,10]

  const { t } = useTranslation();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="col-lg-12 slider">
      <div style={{display: "flex",alignItems:"center"}}><IoIosFlash style={{fontSize: "25px"}}/>
      <h1 className="title" >
        {title}
      </h1></div>
      <Slider {...settings}>
        {shops.map((data) => {
          return(
            <div className="justifyContentCenter"
            style={{margin: "30px"}}
            // style={{ display: "flex", justifyContent: "center" }} 
            >
            <Card
              id={1}
              icon={NoImageArabic}
              name="Shop Name"
              col={"2"}
              heading={"Staff"}
              stars={<RiStarSFill className="star_margin" />}
              rating={4}
            />
          </div>
          )
            })}
           </Slider>
    </div>
  );
}
