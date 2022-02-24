import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "./style.css";
import Card from "../Card";
import { RiStarSFill } from "react-icons/ri";
import { Rate } from "antd";
import { Skeleton } from "antd";

export default function ShopLoader(props) {
  const { title, shops, isloading } = props;
  const { t } = useTranslation();
  const shopLoaderArray = [1, 2, 3, 4,5];
  const imageUrl = "https://red.katmeer.com/";
  // console.log(shops)
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
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   },
      // },
    ],
  };
  return (
    <div className="col-lg-12 slider">
      <h1 className="title" >
        {title}
      </h1>
        <Slider {...settings}>
        {shopLoaderArray.map((data) => {
              return (
                <div
                className="justifyContentCenter"
                  // style={{ display: "flex", justifyContent: "center" }}
                  key={data}
                >
                <Skeleton.Input
                  className={"shop_card_loader"}
                  active={true}
                />
                </div>
              );
            })
        }

        </Slider>
    </div>
  );
}