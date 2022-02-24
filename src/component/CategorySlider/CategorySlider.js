import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import CategoryCard from "../counterCard/CounterCard";
import logo from "../../images/working-at-home@2x.png";
import { useTranslation } from "react-i18next";
import "./style.css";
import { BaseUrl } from "../../config/api/_Domain";

export default function CategorySlider(props) {
  const { title, data, IsActive, isloading } = props;
  // const imageUrl = "https://uaqbusiness.com/";
  const { t } = useTranslation();
  const arabicSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    rtl: true,
    // rtl: false,
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    // rtl: true,
    // rtl: false,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          // initialSlide: 3,
          // rtl: true,
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
          // rtl: true,
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
          // rtl: true,
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
          // rtl: true,
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
          // rtl: true,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  // console.log(BaseUrl)
  // console.log(t("lang") == "ar")
  useEffect( () => {
    // console.log("Hello")
  }, [t]);
  // debugger
  return (
    <div className="col-lg-12 slider">
      <h1 className="title" >
        {/* Categories */}
        {title}
      </h1>
      <div  >
      {t("lang") == "ar" ?  <Slider {...arabicSettings}>
          {data.map((data) => { 
              return <div
              className="justifyContentCenter"
                // style={{ display: "flex", justifyContent: "center" }}
                key={data.Id}
                dir = "rtl"
                // dir = {t("lang" == "ar" ? "rtl" : "ltr")}
              >
                <div
                  id="category_container"
                  className={`dashboardSections`}
                  //   style={{ width: "250px" }}
                  style={
                    IsActive == data.Id
                      ? {
                          backgroundColor: "#f58220",
                        }
                      : { margin: "0px" }
                  }
                  onClick={() => {
                    props.handleSubCategoryfetch(data.Id);
                    props.isActive(data.Id);
                  }}
                >
                  <CategoryCard
                    icon={`${BaseUrl}${data.Image}`}
                    count={t("lang") === "en" ? data.Name : data.ArabicName}
                    col={"2"}
                    heading={"Staff"}
                    isActive={IsActive == data.Id ? true : false}
                  />
                </div>
              </div>
          })}
      </Slider>
       :  <Slider {...settings}>
          {data.map((data) => { 
              return <div
              className="justifyContentCenter"
                // style={{ display: "flex", justifyContent: "center" }}
                key={data.Id}
                dir = "ltr"
                // dir = {t("lang" == "ar" ? "rtl" : "ltr")}
              >
                <div
                  id="category_container"
                  className={`dashboardSections`}
                  style={
                    IsActive == data.Id
                      ? {
                          backgroundColor: "#f58220",
                        }
                      : { margin: "0px" }
                  }
                  onClick={() => {
                    props.handleSubCategoryfetch(data.Id);
                    props.isActive(data.Id);
                  }}
                >
                  <CategoryCard
                    icon={`${BaseUrl}${data.Image}`}
                    count={t("lang") === "en" ? data.Name : data.ArabicName}
                    col={"2"}
                    heading={"Staff"}
                    isActive={IsActive == data.Id ? true : false}
                  />
                </div>
              </div>
          })}
      </Slider>}
     </div>
    </div>
  );
}
