import React, { useState } from "react";
import Slider from "react-slick";
import CategoryCard from "../counterCard/CounterCard";
import logo from "../../images/working-at-home@2x.png";
import { useTranslation } from "react-i18next";
import "./style.css";
import { Skeleton } from "antd";

export default function NoData(props) {
    const { title, data, IsActive, isloading } = props;
    const imageUrl = "https://red.katmeer.com/";
    const { t } = useTranslation();
    const categoryLoaderArray = [1, 2, 3, 4, 5];
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const arabicSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        rtl: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    rtl: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    rtl: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    infinite: false,
                    dots: false,
                    rtl: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: true,
                },
            },
        ],
    };
    return (
        
        <div className="col-lg-12 slider">
            {/* <h1 className="title" >
                {title}
            </h1> */}
            <section class="small-banner section">
            {t("lang") == "ar" ? <Slider {...arabicSettings}>
            <div
            // style={{ display: "flex", justifyContent: "center" }}
            className="justifyContentCenter"
          >
            <img className="no-data-image" src="../assets/img/NO-Data-found.png" />
          </div>
            </Slider> :
            <Slider {...settings}>
            <div
            // style={{ display: "flex", justifyContent: "center" }}
            className="justifyContentCenter"
          >
            <img className="no-data-image" src="../assets/img/NO-Data-found.png" />
          </div>
            </Slider>}
            </section>
        </div>
    );
}