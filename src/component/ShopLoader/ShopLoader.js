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
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1098,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="col-lg-12 slider">
      <section class="small-banner section">
        <Slider {...settings}>
        {shopLoaderArray.map((data) => {
              return (
                <div
                className="justifyContentCenter"
                  // style={{ display: "flex", justifyContent: "center" }}
                  key={data}
                >
                <Skeleton.Input
                  className={"bannar-loader"}
                  active={true}
                />
                </div>
              );
            })
        }

        </Slider>
        </section>
    </div>
  );
}