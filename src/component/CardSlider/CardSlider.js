import React from "react";
import Slider from "react-slick";
import {useTranslation} from "react-i18next";
import "./style.css";

import {useHistory} from "react-router-dom";
// import { BaseUrl } from "../../config/api/_Domain";

export default function CardSlider(props) {
  const { title, offers, isloading } = props;
  const { t } = useTranslation();
  const shopLoaderArray = [1, 2, 3, 4, 5];
  const history = useHistory();
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
                          <img src={`http://localhost:3333/uploads/offer/${offer.avatar}`} alt="#" />
                          {/* <div class="content">
                          <p>{offer.title}</p>
                          <h3>
                            {offer.description}
                          </h3>
                          <Link to={`product/${offer._id}`}>Discover Now</Link>
                        </div> */}
                          <div>
                            <h1 class="title">
                              50% Off For Your First Shopping
                            </h1>
                            <div
                              color="secondary.main"
                              class="Typography-sc-1nbqu5-0 gGleOi"
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Quis lobortis consequat eu, quam etiam at
                              quis ut convallis.
                            </div>
                            <button
                              class="Button-sc-l2616d-0 bRMjZL button-link"
                              color="primary"
                            >
                              Visit Collections
                            </button>
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
                          <img src={`http://localhost:3333/uploads/offer/${offer.avatar}`} alt="#" />
                          {/* <div class="content">
                            <p>{offer.title}</p>
                            <h3>
                              {offer.description}
                            </h3>
                            <Link to={`product/${offer._id}`}>
                              Discover Now
                            </Link>
                          </div> */}
                          <div class="content">
                            <h1 class="title limit-text">{offer.title}</h1>
                            <div
                              color="secondary.main"
                              class="Typography-sc-1nbqu5-0 gGleOi limit-text-two"
                            >
                              {offer.description}
                            </div>
                            <button
                                class="Button-sc-l2616d-0 bRMjZL button-link"
                              color="primary"
                              onClick={() => {
                                history.push(`product-by-offer/${offer.id}`);
                              }}
                            >
                              Visit Collections
                            </button>
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
