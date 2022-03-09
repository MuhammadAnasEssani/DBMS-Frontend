import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import NoImage from "../../images/No-image.jpg";
import NoImageArabic from "../../images/No-image-arabic.jpg";
import "./style.css";
import Card from "../Card";
import { RiStarSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { BaseUrl } from "../../config/api/_Domain";

export default function CardSlider(props) {
  const { title, offers, isloading } = props;
  const { t } = useTranslation();
  const shopLoaderArray = [1, 2, 3, 4, 5];
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
      {/* <h1 className="title">{title}</h1> */}
      {/* <div className={t("lang") == "ar" ? "teamx_slider" : "teamx"} dir="rtl"> */}
      {t("lang") == "ar" ? (
        <Slider {...settings}>
          {offers.length > 0
            ? offers.map((offer) => {
                return (
                  <div>
                    <div class="col-lg-12 col-md-12 col-12">
                      <div class="single-banner">
                        <img src={offer.avatar} alt="#" />
                        <div class="content">
                          <p>{offer.title}</p>
                          <h3>
                            {offer.description}
                            {/* Summer travel <br /> collection */}
                          </h3>
                          <Link to={`product/${offer._id}`}>Discover Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </Slider>
      ) : (
        <Slider {...settings}>
          {offers.length > 0
            ? offers.map((offer) => {
                return (
                  <div>
                    <div class="col-lg-12 col-md-12 col-12">
                      <div class="single-banner">
                        <img src={offer.avatar} alt="#" />
                        <div class="content">
                          <p>{offer.title}</p>
                          <h3>
                            {offer.description}
                            {/* Summer travel <br /> collection */}
                          </h3>
                          <Link to={`product/${offer._id}`}>Discover Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </Slider>
      )}
      </section>
      {/* </div> */}
    </div>
  );
}
