import React, {useEffect, useState} from "react";
// import CardSlider from "../../component/CardSlider/CardSlider";
// import NoData from "../../component/No-Data/NoData";
// import ShopLoader from "../../component/ShopLoader/ShopLoader";
import Notification from "../../component/notification/Notification";
import {getDiscountedProduct, getFeaturedProduct,} from "../../config/api/products";
import NoData from "../../component/No-Data/NoData";
import CardSlider from "../../component/CardSlider/CardSlider";
import ShopLoader from "../../component/ShopLoader/ShopLoader";
import Card from "../../component/Card";
import {Link} from "react-router-dom";
import {getOffers} from "../../config/api/offer";
import {Skeleton} from "antd";
import Bannar from "../../component/Bannar/Bannar";

export default function AdminDashboard() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [offerLoader, setOfferLoader] = useState(true);
  const [featureLoader, setFeatureLoader] = useState(true);
  const [discountLoader, setDiscountLoader] = useState(true);
  const [offers, setOffers] = useState([]);
  const [Lowest, setLowest] = useState(Number.NEGATIVE_INFINITY);
  const [Highest, setHighest] = useState(Number.POSITIVE_INFINITY);
  // const [shopLoader, setShopLoader] = useState(false);
  const shopLoaderArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const getFeaturedProducts = async () => {

    try {
      const res = await getFeaturedProduct();
      if (res.status == 200) {
        setFeaturedProducts(res.data.data);
        setFeatureLoader(false);
        return;
      } else {
        Notification("Featured Products", res.data.message, "Error");
        return;
      }
    } catch (err) {
      Notification("Featured Products", "Something went wrong", "Error");
    }
  };
  const getDiscountedProducts = async () => {

    try {
      const res = await getDiscountedProduct();
      if (res.status == 200) {
        setDiscountedProducts(res.data.data);
        setDiscountLoader(false);
        return;
        // setOfferLoader(false);
      } else {
        Notification("Discounted Products", res.data.message, "Error");
        return;
      }
    } catch (err) {
      Notification("Discounted Products", "Something went wrong", "Error");
    }
  };
  const getOffer = async () => {
    try {
      const res = await getOffers();
      if (res.status == 200) {
        setOffers(res.data.data);
        // console.log(offers)
        setOfferLoader(false);
        return;
      } else {
        Notification("Offers", res.data.message, "Error");
        return;
      }
    } catch (err) {
      Notification("Offers", "Something went wrong", "Error");
    }
  };
  useEffect(() => {
    // dispatch(getProductsBySlug(slug));
    getFeaturedProducts();
    getDiscountedProducts();
    getOffer();
    // console.log(products)
  }, []);

  return (
      <>
        {/* <MainBanner /> */}
        {/* <BannerMain /> */}
        <Bannar />
        {offerLoader ? (
            <ShopLoader title="Shops" />
        ) : offers.length > 0 ? (
            <CardSlider title="Shops" isloading={offerLoader} offers={offers} />
        ) : (
            <NoData title="Shops" />
        )}
        <section id="hero" className="hero d-flex align-items-center" style={{padding: "0px"}}>
          <div className="container" style={{ position: "relative" }}>
            <div className="row" style={{ margin: "25px 0px" }}>
              <div
                  cursor="unset"
                  class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 hKAarp epjUQS"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <IoIosFlash style={{ fontSize: "25px" }} /> */}
                  <h1 className="title">Feature Products</h1>
                </div>
                {featuredProducts.length > 9 && (
                    <Link to="/featured-products">
                      <div
                          color="text.muted"
                          cursor="unset"
                          class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 jqjXmN jFZEiW"
                      >
                    <span
                        font-size="14px"
                        color="text.muted"
                        class="Typography-sc-1nbqu5-0 gkKqDD"
                    >
                      View all
                    </span>
                        <div
                            defaultcolor="currentColor"
                            variant="medium"
                            class="IconStyle__StyledIcon-sc-18inybg-0 jAjWAO"
                        >
                          <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="10"
                                viewBox="0 0 11 10"
                                fill="none"
                                class="injected-svg"
                                data-src="/assets/images/icons/right-arrow.svg"
                                xlink="http://www.w3.org/1999/xlink"
                            >
                              <g clip-path="url(#clip0-38)">
                                <path
                                    d="M9.73948 4.8117L1.47853 0.0290272C1.41158 -0.00967573 1.32853 -0.00967573 1.2607 0.0290272C1.19375 0.0677301 1.15201 0.13947 1.15201 0.217283V9.78261C1.15201 9.86044 1.19375 9.93218 1.2607 9.97086C1.29418 9.99 1.33201 9.99999 1.36939 9.99999C1.40721 9.99999 1.44461 9.99043 1.47853 9.97086L9.73948 5.18819C9.80643 5.14906 9.84775 5.07732 9.84775 4.99993C9.84775 4.92255 9.80643 4.85038 9.73948 4.8117Z"
                                    fill="#7D879C"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0-38">
                                  <rect
                                      width="10"
                                      height="10"
                                      fill="white"
                                      transform="translate(0.499939)"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                )}
              </div>
              <div className="row" >
                {featureLoader
                    ? shopLoaderArray.map((data) => {
                      return (
                          <div
                              className="justifyContentCenter"
                              style={{ width: "auto", margin: "15px 0px" }}
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
                    : featuredProducts.length > 0
                        ? featuredProducts.slice(0, 9).map((data) => {
                          return (
                              <div
                                  className="justifyContentCenter"
                                  style={{ width: "auto", margin: "15px 0px" }}
                                  // style={{ display: "flex", justifyContent: "center" }}
                              >
                                <Card
                                    id={data.id}
                                    image={data.pictures[0].avatar}
                                    name={data.name}
                                    rating={4}
                                    noOfRatings={6}
                                    price={data.price}
                                    slug={data.id}
                                    discount={data.discount}
                                />
                              </div>
                          );
                        })
                        : null}
              </div>
              {/* {shopLoader ? (
              <ShopLoader title="Flash Deals" />
            ) : reviewedShops.length > 0 ? (
              <CardSlider
                title="Flash Deals"
                isloading={shopLoader}
              />
            ) : (
              <NoData title="Flash Deals" />
            )} */}
            </div>
            <div className="row" style={{ margin: "25px 0px" }}>
              <div
                  cursor="unset"
                  class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 hKAarp epjUQS"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <IoIosFlash style={{ fontSize: "25px" }} /> */}
                  <h1 className="title">Top Discounts</h1>
                </div>
                {discountedProducts.length > 9 && (
                    <Link to="/discounted-products">
                      <div
                          color="text.muted"
                          cursor="unset"
                          class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 jqjXmN jFZEiW"
                      >
                    <span
                        font-size="14px"
                        color="text.muted"
                        class="Typography-sc-1nbqu5-0 gkKqDD"
                    >
                      View all
                    </span>
                        <div
                            defaultcolor="currentColor"
                            variant="medium"
                            class="IconStyle__StyledIcon-sc-18inybg-0 jAjWAO"
                        >
                          <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="10"
                                viewBox="0 0 11 10"
                                fill="none"
                                class="injected-svg"
                                data-src="/assets/images/icons/right-arrow.svg"
                                xlink="http://www.w3.org/1999/xlink"
                            >
                              <g clip-path="url(#clip0-38)">
                                <path
                                    d="M9.73948 4.8117L1.47853 0.0290272C1.41158 -0.00967573 1.32853 -0.00967573 1.2607 0.0290272C1.19375 0.0677301 1.15201 0.13947 1.15201 0.217283V9.78261C1.15201 9.86044 1.19375 9.93218 1.2607 9.97086C1.29418 9.99 1.33201 9.99999 1.36939 9.99999C1.40721 9.99999 1.44461 9.99043 1.47853 9.97086L9.73948 5.18819C9.80643 5.14906 9.84775 5.07732 9.84775 4.99993C9.84775 4.92255 9.80643 4.85038 9.73948 4.8117Z"
                                    fill="#7D879C"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0-38">
                                  <rect
                                      width="10"
                                      height="10"
                                      fill="white"
                                      transform="translate(0.499939)"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                )}
              </div>
              <div className="row" >
                {discountLoader
                    ? shopLoaderArray.map((data) => {
                      return (
                          <div
                              className="justifyContentCenter"
                              style={{ width: "auto", margin: "15px 0px" }}
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
                    : discountedProducts.length > 0
                        ? discountedProducts.slice(0, 9).map((data) => {
                          return (
                              <div
                                  className="justifyContentCenter"
                                  style={{ width: "auto", margin: "15px 0px" }}
                                  // style={{ display: "flex", justifyContent: "center" }}
                              >
                                <Card
                                    id={data.id}
                                    image={data.pictures[0].avatar}
                                    name={data.name}
                                    rating={4}
                                    noOfRatings={6}
                                    price={data.price}
                                    slug={data.id}
                                    discount={data.discount}
                                />
                              </div>
                          );
                        })
                        : null}
              </div>
              {/* {shopLoader ? (
              <ShopLoader title="Flash Deals" />
            ) : reviewedShops.length > 0 ? (
              <CardSlider
                title="Flash Deals"
                isloading={shopLoader}
              />
            ) : (
              <NoData title="Flash Deals" />
            )} */}
            </div>
          </div>
        </section>
        {/* <ShopServices /> */}
      </>
  );
}
