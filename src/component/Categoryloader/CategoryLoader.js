import React, { useState } from "react";
import Slider from "react-slick";
import CategoryCard from "../counterCard/CounterCard";
import logo from "../../images/working-at-home@2x.png";
import { useTranslation } from "react-i18next";
import "./style.css";
import { Skeleton } from "antd";

export default function CategoryLoader(props) {
  const { title, data, IsActive, isloading } = props;
  const imageUrl = "https://red.katmeer.com/";
  const { t } = useTranslation();
  const categoryLoaderArray = [1, 2, 3, 4, 5];
  // console.log(data)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    // rtl: true,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          // initialSlide: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // initialSlide: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          // initialSlide: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // initialSlide: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  const arabicSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    rtl: true,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          // initialSlide: 3,
          rtl: true,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // initialSlide: 1,
          rtl: true,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          // initialSlide: 1,
          rtl: true,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // initialSlide: 1,
          rtl: true,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 1,
          rtl: true,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="col-lg-12 slider">
      <h1 className="title" >
        {/* Categories */}
        {title}
      </h1>
      {t("lang") == "ar" ?
      
      <Slider {...arabicSettings}>
          {categoryLoaderArray.map((data) => {
            return (
              <div
              className="justifyContentCenter"
                // style={{ display: "flex", justifyContent: "center" }}
                key={data.Id}
              >
                <Skeleton.Input
                  className="loader_skeleton"
                  active={true}
                />
              </div>
            );
          })}
      </Slider> : <Slider {...settings}>
          {categoryLoaderArray.map((data) => {
            return (
              <div
              className="justifyContentCenter"
                // style={{ display: "flex", justifyContent: "center" }}
                key={data.Id}
              >
                <Skeleton.Input
                  className="loader_skeleton"
                  active={true}
                />
              </div>
            );
          })}
      </Slider> }
    </div>
  );
}