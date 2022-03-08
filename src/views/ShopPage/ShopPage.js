import React, { useEffect, useState } from "react";
import Card from "../../component/Card";
import NoImageArabic from "../../images/No-image-arabic.jpg";
import { FaFilter } from "react-icons/fa";
import { Rate } from "antd";
import { getProducts, getProductsByShop } from "../../config/api/products";
import { Link, useParams } from "react-router-dom";
import Notification from "../../component/notification/Notification";
import { getShopDetail } from "../../config/api/shops";

export default function ShopPage() {
  const shops = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [shop, setShop] = useState("");
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const { shopId } = useParams();

  const getShop = async () => {
    try {
      const res = await getShopDetail(shopId);
      if (res.status == 200) {
        setShop(res.data.shop);
      } else {
        Notification("Shop Detail", res.data.message, "Error");
      }
    } catch (err) {
      Notification("Shop Detail", "Something went wrong", "Error");
    }
  };
  const getProduct = async() => {
    try{
      const res = await getProductsByShop(shopId);
      // console.log(res)
      if(res.status == 200){

          setProducts(res.data.products)
      }else{
          Notification("Shop Products", "Something went wrong", "Error");
      }
    }catch(err){
      Notification("Shop Products", "Something went wrong", "Error");
    }
}
  useEffect(() => {
    // dispatch(getProductsBySlug(slug));
    getShop();
    getProduct();
    // console.log(products)
  }, []);
  // console.log(shop)
  return (
    <>
      <section id="hero" className="hero d-flex align-items-center">
        {/* <Drawer
     className='drawerr'
              placement="left"
            //   onClose={onClose}
              visible={visible}
            >
                </Drawer> */}
        <div className="container" style={{ position: "relative" }}>
          <div className="elevation container">
            <div>
              <FaFilter
                style={{ cursor: "pointer" }}
                onClick={() => {
                  filter ? setFilter(false) : setFilter(true);
                }}
              />
            </div>
            <div>
              <h5 className="elevation-title">Searching For Mobile</h5>
            </div>
          </div>
          {shop != "" ? (
            <div
              overflow="hidden"
              cursor="unset"
              class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 ShopStyle__ShopIntroWrapper-sc-1rpgc57-0 pnkKi RNxxl iirmRh"
            >
              <div
                class="Box-sc-15jsbqj-0 fuKUeD cover-image"
                height="202px"
                cursor="unset"
              ></div>
              <div
                cursor="unset"
                class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 hcVWvr zazAh"
              >
                <div
                  size="120"
                  class="AvatarStyle__StyledAvatar-sc-1tfjtzs-0 kGYVbQ"
                >
                  <img src={shop.avatar} alt="avatar" />
                </div>
                <div
                  class="Box-sc-15jsbqj-0 htpvxr description-holder"
                  cursor="unset"
                >
                  <div
                    cursor="unset"
                    class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 gSdWHV kYpwWj"
                  >
                    <div
                      display="inline-block"
                      cursor="unset"
                      class="Box-sc-15jsbqj-0 bYczoF"
                    >
                      <h3
                        font-size="20px"
                        font-weight="600"
                        color="gray.100"
                        class="Typography-sc-1nbqu5-0 ldugQD"
                      >
                        Scarlett Beauty
                      </h3>
                    </div>
                    <div
                      cursor="unset"
                      class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 ftFTVt kthaoT"
                    >
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <div
                          mr="10px"
                          defaultcolor="auto"
                          variant="medium"
                          class="IconStyle__StyledIcon-sc-18inybg-0 sRmnT"
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              class="injected-svg"
                              data-src="/assets/images/icons/facebook_filled.svg"
                              xlink="http://www.w3.org/1999/xlink"
                            >
                              <circle
                                cx="15"
                                cy="15"
                                r="15"
                                fill="#3B5998"
                              ></circle>
                              <path
                                d="M12.7208 22H15.5937V16.098H18.1823L18.4667 13.1651H15.5937V11.6842C15.5937 11.2773 15.9153 10.9474 16.312 10.9474H18.4667V8H16.312C14.3286 8 12.7208 9.64948 12.7208 11.6842V13.1651H11.2843L11 16.098H12.7208V22Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <div
                          mr="10px"
                          defaultcolor="auto"
                          variant="medium"
                          class="IconStyle__StyledIcon-sc-18inybg-0 sRmnT"
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              class="injected-svg"
                              data-src="/assets/images/icons/twitter_filled.svg"
                              xlink="http://www.w3.org/1999/xlink"
                            >
                              <circle
                                cx="15"
                                cy="15"
                                r="15"
                                fill="#00ACEE"
                              ></circle>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.5556 8C12.4147 8 13.1111 8.69645 13.1111 9.55556V11.8889H17.7778C18.6369 11.8889 19.3333 12.5853 19.3333 13.4444C19.3333 14.3036 18.6369 15 17.7778 15H13.1111V16.5556C13.1111 17.8442 14.1558 18.8889 15.4444 18.8889H17.7778C18.6369 18.8889 19.3333 19.5853 19.3333 20.4444C19.3333 21.3036 18.6369 22 17.7778 22H15.4444C12.4376 22 10 19.5624 10 16.5556V9.55556C10 8.69645 10.6964 8 11.5556 8Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <div
                          mr="10px"
                          defaultcolor="auto"
                          variant="medium"
                          class="IconStyle__StyledIcon-sc-18inybg-0 sRmnT"
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              class="injected-svg"
                              data-src="/assets/images/icons/youtube_filled.svg"
                              xlink="http://www.w3.org/1999/xlink"
                            >
                              <circle
                                cx="15"
                                cy="15"
                                r="15"
                                fill="#FF0000"
                              ></circle>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.25 11.5H19.75C20.1642 11.5 20.5 11.8358 20.5 12.25V18.25C20.5 18.6642 20.1642 19 19.75 19H9.25C8.83579 19 8.5 18.6642 8.5 18.25V12.25C8.5 11.8358 8.83579 11.5 9.25 11.5ZM7 12.25C7 11.0074 8.00736 10 9.25 10H19.75C20.9926 10 22 11.0074 22 12.25V18.25C22 19.4926 20.9926 20.5 19.75 20.5H9.25C8.00736 20.5 7 19.4926 7 18.25V12.25ZM13 13L16 15.25L13 17.5V13Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <div
                          defaultcolor="auto"
                          variant="medium"
                          class="IconStyle__StyledIcon-sc-18inybg-0 bgVWLg"
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              class="injected-svg"
                              data-src="/assets/images/icons/instagram_filled.svg"
                              xlink="http://www.w3.org/1999/xlink"
                            >
                              <circle
                                cx="15"
                                cy="15"
                                r="15"
                                fill="#E1306C"
                              ></circle>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15 11.8182C13.2427 11.8182 11.8182 13.2427 11.8182 15C11.8182 16.7573 13.2427 18.1818 15 18.1818C16.7573 18.1818 18.1818 16.7573 18.1818 15C18.1818 13.2427 16.7573 11.8182 15 11.8182ZM13.0909 15C13.0909 16.0544 13.9456 16.9091 15 16.9091C16.0544 16.9091 16.9091 16.0544 16.9091 15C16.9091 13.9456 16.0544 13.0909 15 13.0909C13.9456 13.0909 13.0909 13.9456 13.0909 15Z"
                                fill="white"
                              ></path>
                              <path
                                d="M18.8182 10.5455C18.4667 10.5455 18.1818 10.8304 18.1818 11.1818C18.1818 11.5333 18.4667 11.8182 18.8182 11.8182C19.1696 11.8182 19.4545 11.5333 19.4545 11.1818C19.4545 10.8304 19.1696 10.5455 18.8182 10.5455Z"
                                fill="white"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M10.5455 8C9.13964 8 8 9.13964 8 10.5455V19.4545C8 20.8604 9.13964 22 10.5455 22H19.4545C20.8604 22 22 20.8604 22 19.4545V10.5455C22 9.13964 20.8604 8 19.4545 8H10.5455ZM19.4545 9.27273H10.5455C9.84255 9.27273 9.27273 9.84255 9.27273 10.5455V19.4545C9.27273 20.1575 9.84255 20.7273 10.5455 20.7273H19.4545C20.1575 20.7273 20.7273 20.1575 20.7273 19.4545V10.5455C20.7273 9.84255 20.1575 9.27273 19.4545 9.27273Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    cursor="unset"
                    class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 ePxrDa drNKDA"
                  >
                    <div cursor="unset" class="Box-sc-15jsbqj-0 kpBqdp">
                      <div
                        cursor="unset"
                        class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 PRjrt daVwwf"
                      >
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
                            fill="url(#star-0.9160228249298503)"
                            stroke="#FFCD4E"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                          >
                            <defs>
                              <linearGradient id="star-0.9160228249298503">
                                <stop offset="1" stop-color="#FFCD4E"></stop>
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
                            fill="url(#star-0.8416425050331473)"
                            stroke="#FFCD4E"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                          >
                            <defs>
                              <linearGradient id="star-0.8416425050331473">
                                <stop offset="1" stop-color="#FFCD4E"></stop>
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
                            fill="url(#star-0.7150964191624427)"
                            stroke="#FFCD4E"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                          >
                            <defs>
                              <linearGradient id="star-0.7150964191624427">
                                <stop offset="1" stop-color="#FFCD4E"></stop>
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
                            fill="url(#star-0.364745645424857)"
                            stroke="#FFCD4E"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                          >
                            <defs>
                              <linearGradient id="star-0.364745645424857">
                                <stop offset="1" stop-color="#FFCD4E"></stop>
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
                            fill="url(#star-0.6243594240386776)"
                            stroke="#FFCD4E"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                          >
                            <defs>
                              <linearGradient id="star-0.6243594240386776">
                                <stop offset="1" stop-color="#FFCD4E"></stop>
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
                        <span
                          font-size="12px"
                          color="text.muted"
                          display="block"
                          class="Typography-sc-1nbqu5-0 fMbDON"
                        >
                          (45)
                        </span>
                      </div>
                      <div
                        color="text.muted"
                        cursor="unset"
                        class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 izutlq NgAVk"
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
                              xlink="http://www.w3.org/1999/xlink"
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
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 fEPyMj"
                        >
                          845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark
                        </span>
                      </div>
                      <div
                        color="text.muted"
                        cursor="unset"
                        class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 ibqUbl gQSTOL"
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
                              xlink="http://www.w3.org/1999/xlink"
                            >
                              <g clip-path="url(#clip0-45)">
                                <path
                                  d="M14.5916 11.0085L12.4983 8.91519C11.7507 8.16759 10.4798 8.46666 10.1807 9.43852C9.95646 10.1114 9.20886 10.4852 8.53601 10.3356C7.0408 9.96184 5.02227 8.01807 4.64846 6.4481C4.42418 5.77522 4.87275 5.02762 5.54559 4.80336C6.51748 4.50432 6.81652 3.23339 6.06891 2.48579L3.97562 0.392493C3.37754 -0.130831 2.48041 -0.130831 1.95709 0.392493L0.536636 1.81294C-0.883814 3.30815 0.686157 7.27046 4.1999 10.7842C7.71365 14.298 11.676 15.9427 13.1712 14.4475L14.5916 13.027C15.115 12.4289 15.115 11.5318 14.5916 11.0085Z"
                                  fill="#7D879C"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0-45">
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
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 fEPyMj"
                        >
                          (613) 343-9004
                        </span>
                      </div>
                    </div>
                    <a href="mailto:scarletbeauty@xmail.com">
                      <button color="primary" class="Button-l2616d-0 iQsGLa">
                        Contact Vendor
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row">
              <div
                className={
                  filter
                    ? "col-xl-3 col-lg-3 col-md-3 col-12 filter-sidebar"
                    : "col-xl-3 col-lg-3 col-md-3 col-12 filter"
                }
              >
                <div className="side-bar">
                  <h6 className="sidebar-titles">Price Range</h6>
                  <div
                    cursor="unset"
                    class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 dtrmfl dJThAn"
                  >
                    <div
                      placeholder="0"
                      class="TextFieldStyle__TextFieldWrapper-h6a756-1 eWddYu"
                    >
                      <div cursor="unset" class="Box-sc-15jsbqj-0 hXORQp">
                        <input
                          placeholder="0"
                          type="number"
                          color="default"
                          class="TextFieldStyle__SyledTextField-h6a756-0 eNEDcO"
                          id="0.08794384869135508"
                        />
                      </div>
                    </div>
                    <h5
                      font-weight="600"
                      font-size="16px"
                      color="text.muted"
                      class="Typography-sc-1nbqu5-0 geDPRR"
                    >
                      -
                    </h5>
                    <div
                      placeholder="250"
                      class="TextFieldStyle__TextFieldWrapper-h6a756-1 eWddYu"
                    >
                      <div cursor="unset" class="Box-sc-15jsbqj-0 hXORQp">
                        <input
                          placeholder="250"
                          type="number"
                          color="default"
                          class="TextFieldStyle__SyledTextField-h6a756-0 eNEDcO"
                          id="0.4472294549448321"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="Divider-sc-119puxu-0 kdZOfo"></div>
                  <h6 className="sidebar-titles">Brands</h6>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        Maccs
                      </span>
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        Maccs
                      </span>
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        Maccs
                      </span>
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        Maccs
                      </span>
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        Maccs
                      </span>
                    </label>
                  </div>
                  <div class="Divider-sc-119puxu-0 kdZOfo"></div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        On Sale
                      </span>
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        In Stock
                      </span>
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        Featured
                      </span>
                    </label>
                  </div>
                  <div class="Divider-sc-119puxu-0 kdZOfo"></div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <Rate allowHalf value={5} />
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <Rate allowHalf value={4} />
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <Rate allowHalf value={3} />
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <Rate allowHalf value={2} />
                    </label>
                  </div>
                  <div
                    color="undefined.main"
                    class="CheckBox__Wrapper-sc-1go6jlo-1 hkaOyo"
                  >
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      id="0.8918393257508421"
                    />
                    <label for="0.8918393257508421">
                      <Rate allowHalf value={1} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-9">
                <div
                  className="row"
                  style={{
                    justifyContent: "space-between",
                    overflow: "auto",
                    height: "80vh",
                  }}
                >
                  {products.length > 0 ? products.map((data) => {
                    return (
                      <div
                        className="justifyContentCenter"
                        style={{ width: "auto", margin: "15px 0px" }}
                        // style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Card
                          id={data._id}
                          image={data.productPictures[0].avatar}
                          name={data.name}
                          rating={data.rating}
                          noOfRatings={data.noOfRatings}
                          price={data.price}
                          slug={data.slug}
                          discount={data.discount}
                        />
                      </div>
                    );
                  }): null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
