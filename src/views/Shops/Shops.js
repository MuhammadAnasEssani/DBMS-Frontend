import React, { useEffect, useState } from "react";
import { getShop } from "../../config/api/shops";
import Notification from "../../component/notification/Notification";
import { Link } from "react-router-dom";


export default function Shops() {
  const [shops, setShops] = useState([]);
  const getShops = async () => {
    try {
      const res = await getShop();
      // console.log(res)
      if (res.status == 200) {
        setShops(res.data.shops);
        return;
      } else {
        Notification("Shops", res.data.message, "Error");
        return;
      }
    } catch (err) {
      Notification("Products", "Something went wrong", "Error");
    }
  };
  useEffect(() => {
    getShops();
  }, []);
  // console.log(shops)
  return (
    <>
      <div class="Container-sc-1n5dyua-0 dEBWZy">
        <div>
          <h2 font-size="25px" class="Typography-sc-1nbqu5-0 latQEk">
            All Shops
          </h2>
          <div spacing="6" class="GridStyle__StyledGrid-sc-1r6thsr-0 iLBSKL">
            {shops.length > 0
              ? shops.map((shop) => {
                  return (
                    <div
                      spacing="6"
                      class="GridStyle__StyledGrid-sc-1r6thsr-0 dmobdU"
                    >
                      <div
                        overflow="hidden"
                        cursor="unset"
                        class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 ShopCardStyle__ShopCard1Wrapper-lsv9mp-0 lkKtCu eYRuqR cGVPXx"
                      >
                        <div
                          class="Box-sc-15jsbqj-0 dbpdfb black-box"
                          cursor="unset"
                        >
                          <h3
                            font-size="20px"
                            font-weight="600"
                            class="Typography-sc-1nbqu5-0 hyFUsi"
                          >
                            Scarlett Beauty
                          </h3>
                          <div cursor="unset" class="Box-sc-15jsbqj-0 kDQKum">
                            <div
                              color="warn"
                              value="5"
                              class="RatingStyle__StyledRating-sc-1e4cply-0 SUxBm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="url(#star-0.08805751974739762)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.08805751974739762">
                                    <stop
                                      offset="1"
                                      stop-color="#FFCD4E"
                                    ></stop>
                                    <stop
                                      offset="1"
                                      stop-color="#FFFFFF"
                                      stop-opacity="1"
                                    ></stop>
                                  </linearGradient>
                                </defs>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="url(#star-0.9907047571958505)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.9907047571958505">
                                    <stop
                                      offset="1"
                                      stop-color="#FFCD4E"
                                    ></stop>
                                    <stop
                                      offset="1"
                                      stop-color="#FFFFFF"
                                      stop-opacity="1"
                                    ></stop>
                                  </linearGradient>
                                </defs>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="url(#star-0.6322950473008899)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.6322950473008899">
                                    <stop
                                      offset="1"
                                      stop-color="#FFCD4E"
                                    ></stop>
                                    <stop
                                      offset="1"
                                      stop-color="#FFFFFF"
                                      stop-opacity="1"
                                    ></stop>
                                  </linearGradient>
                                </defs>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="url(#star-0.33047914917303856)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.33047914917303856">
                                    <stop
                                      offset="1"
                                      stop-color="#FFCD4E"
                                    ></stop>
                                    <stop
                                      offset="1"
                                      stop-color="#FFFFFF"
                                      stop-opacity="1"
                                    ></stop>
                                  </linearGradient>
                                </defs>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="url(#star-0.8544312938905023)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.8544312938905023">
                                    <stop
                                      offset="1"
                                      stop-color="#FFCD4E"
                                    ></stop>
                                    <stop
                                      offset="1"
                                      stop-color="#FFFFFF"
                                      stop-opacity="1"
                                    ></stop>
                                  </linearGradient>
                                </defs>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            </div>
                          </div>
                          <div
                            cursor="unset"
                            class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 ipBxwE eGzDxq"
                          >
                            <div
                              defaultcolor="currentColor"
                              mt="5px"
                              variant="medium"
                              class="IconStyle__StyledIcon-sc-18inybg-0 hmKccT"
                            >
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                  class="injected-svg"
                                  data-src="/assets/images/icons/map-pin-2.svg"
                                  xmlns="http://www.w3.org/1999/xlink"
                                >
                                  <path
                                    d="M8.50002 0C5.10516 0 2.34326 2.7619 2.34326 6.15672C2.34326 10.3698 7.85295 16.5548 8.08753 16.8161C8.30787 17.0615 8.69256 17.0611 8.9125 16.8161C9.14708 16.5548 14.6568 10.3698 14.6568 6.15672C14.6567 2.7619 11.8948 0 8.50002 0ZM8.50002 9.25434C6.79198 9.25434 5.40243 7.86476 5.40243 6.15672C5.40243 4.44869 6.79201 3.05914 8.50002 3.05914C10.208 3.05914 11.5976 4.44872 11.5976 6.15676C11.5976 7.86479 10.208 9.25434 8.50002 9.25434Z"
                                    fill="#7D879C"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                            <span
                              font-size="14px"
                              color="white"
                              class="Typography-sc-1nbqu5-0 iwNRTV"
                            >
                              {shop.description}
                            </span>
                          </div>
                          <div
                            cursor="unset"
                            class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 kpBqdp kSPLmH"
                          >
                            <div
                              defaultcolor="currentColor"
                              mt="4px"
                              variant="medium"
                              class="IconStyle__StyledIcon-sc-18inybg-0 gqNtsC"
                            >
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  class="injected-svg"
                                  data-src="/assets/images/icons/phone_filled.svg"
                                  xmlns="http://www.w3.org/1999/xlink"
                                >
                                  <g clip-path="url(#clip0-353)">
                                    <path
                                      d="M14.5916 11.0085L12.4983 8.91519C11.7507 8.16759 10.4798 8.46666 10.1807 9.43852C9.95646 10.1114 9.20886 10.4852 8.53601 10.3356C7.0408 9.96184 5.02227 8.01807 4.64846 6.4481C4.42418 5.77522 4.87275 5.02762 5.54559 4.80336C6.51748 4.50432 6.81652 3.23339 6.06891 2.48579L3.97562 0.392493C3.37754 -0.130831 2.48041 -0.130831 1.95709 0.392493L0.536636 1.81294C-0.883814 3.30815 0.686157 7.27046 4.1999 10.7842C7.71365 14.298 11.676 15.9427 13.1712 14.4475L14.5916 13.027C15.115 12.4289 15.115 11.5318 14.5916 11.0085Z"
                                      fill="#7D879C"
                                    ></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0-353">
                                      <rect
                                        width="15"
                                        height="15"
                                        fill="white"
                                      ></rect>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                            <span
                              font-size="14px"
                              color="white"
                              class="Typography-sc-1nbqu5-0 iwNRTV"
                            >
                              (613) 343-9004
                            </span>
                          </div>
                        </div>
                        <div
                          cursor="unset"
                          class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 jRxINg linmay"
                        >
                          <div
                            size="64"
                            class="AvatarStyle__StyledAvatar-sc-1tfjtzs-0 RElpU"
                          >
                            <img
                              src={shop.avatar}
                              alt="avatar"
                            />
                          </div>
                          <Link to={`/shop/${shop._id}`}>
                            <button class="IconButton-sc-6b71ah-0 fhZElw">
                              <div
                                defaultcolor="auto"
                                variant="medium"
                                class="IconStyle__StyledIcon-sc-18inybg-0 hkojjV"
                              >
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    class="injected-svg"
                                    data-src="/assets/images/icons/arrow-long-right.svg"
                                    xmlns="http://www.w3.org/1999/xlink"
                                  >
                                    <path
                                      d="M23.0676 11.9928L18.8178 7.75732L17.406 9.17392L19.2414 11.0031L0.932347 11.0011L0.932129 13.0011L19.2368 13.0031L17.4153 14.8308L18.8319 16.2426L23.0676 11.9928Z"
                                      fill="#7D879C"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
