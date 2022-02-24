import React from "react";
import "./MainBanner.css";
import Slider from "react-slick";

export default function MainBanner() {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    cssEase: "linear",
  };
  return (
    <>
      <div>
        <Slider {...settings}>
            <div  >
                <div >
            <img src="../assets/img/banner-1.png" alt="" className="main-banner" />
            </div>
            </div>
            {/* <div  className="main-banner" Style="background-image: url(../assets/img/banner-1.png);">
            
            </div> */}
            {/* <>
            <img src="https://th.bing.com/th/id/R.55c761105e287ace01c354bb4bb6a20d?rik=8M4xb%2bKNIiizjw&pid=ImgRaw&r=0" alt="" style={{width: "100%", height: "80vh"}}/>
            </> */}
        </Slider>
      </div>
    </>
  );
}