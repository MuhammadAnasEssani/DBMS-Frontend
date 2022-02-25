import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardSlider from "../../component/CardSlider/CardSlider";
import NoData from "../../component/No-Data/NoData";
import ShopLoader from "../../component/ShopLoader/ShopLoader";
import BannerMain from "../../component/BannerMain/BannerMain";
import ShopServices from "../../component/ShopServices";
import MainBanner from "../../component/MainBanner/MainBanner";
export default function AdminDashboard() {
  const [reviewedShops, setReviewedShops] = useState([1, 2]);
  const [shopLoader, setShopLoader] = useState(false);


  return (
    <>
    <MainBanner />
      <BannerMain />
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container" style={{ position: "relative" }}>
          <div
            className="row"
          >

            {shopLoader ? (
              <ShopLoader title="Flash Deals" />
            ) : reviewedShops.length > 0 ? (
              <CardSlider
                title="Flash Deals"
                isloading={shopLoader}
              />
            ) : (
              <NoData title="Flash Deals" />
            )}
          </div>
        </div>
      </section>
      <ShopServices />
    </>
  );
}
