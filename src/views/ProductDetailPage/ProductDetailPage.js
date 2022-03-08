import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductDetail } from "../../config/api/products";
import Notification from "../../component/notification/Notification";
import { BsHeart } from "react-icons/bs";
import { RiStarSFill } from "react-icons/ri";
import { addToCart } from "../../store/actions";
import { useDispatch } from "react-redux";
import { getProductRatings } from "../../config/api/rating";
import { Rate } from "antd";
export default function ProductDetailPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [productRatings, setProductRatings] = useState([]);
  const [addToWishList, setAddToWishList] = useState(true);
  const dispatch = useDispatch();
  const getProductDetails = async () => {
    try {
      const res = await getProductDetail(productId);
      if (res.status == 200) {
        setProductDetail(res.data.product);
      } else {
        Notification("Product Detail", "Something went wrong", "Error");
      }
    } catch (err) {
      Notification("Product Detail", "Something went wrong", "Error");
    }
  };
  const getProductRating = async () => {
    try {
      const res = await getProductRatings(productId);
      // console.log(res)
      if (res.status == 200) {
        setProductRatings(res.data.ratings);
        return;
      } else {
        Notification("Product Ratings", "Something went wrong", "Error");
        return;
      }
    } catch (err) {
      Notification("Product Ratings", "Something went wrong", "Error");
    }
  };
  const imgs = document.querySelectorAll(".img-select a");
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  window.addEventListener("resize", slideImage);
  // const Active = (key) => {
  //     var img = document.getElementById("productDescImg");
  //     img.src = key.target.src;
  //   };
  useEffect(() => {
    getProductDetails();
    getProductRating();
  }, []);
  // console.log(productRatings);
  // console.log(productDetail);
  return (
    <>
      {productDetail != "" ? (
        <div class="card-wrapper">
          <div class="card">
            {/* <!-- card left --> */}
            <div class="product-imgs">
              <div class="img-display">
                <div class="img-showcase">
                  {productDetail.productPictures.map((thumb, index) => (
                    <img
                      key={thumb.avatar}
                      src={thumb.avatar}
                      alt={thumb.avatar}
                    />
                  ))}
                  {/* <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                  alt="shoe image"
                /> */}
                </div>
              </div>
              <div class="img-select">
                {productDetail.productPictures.map((thumb, index) => (
                  <div class="img-item">
                    <a href="#" data-id={index + 1}>
                      <img
                        key={thumb.avatar}
                        src={thumb.avatar}
                        alt={thumb.avatar}
                      />
                    </a>
                  </div>
                ))}
                {/* <div class="img-item">
                <a href="#" data-id="1">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div class="img-item">
                <a href="#" data-id="2">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div class="img-item">
                <a href="#" data-id="3">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div class="img-item">
                <a href="#" data-id="4">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                    alt="shoe image"
                  />
                </a>
              </div> */}
              </div>
            </div>
            {/* <!-- card right --> */}
            <div class="product-content">
              <h2 class="product-title">{productDetail.name}</h2>
              <Link to={`/shop/${productDetail.createdBy._id}`} class="product-link">
                {productDetail.createdBy.shopName}
              </Link>
              <div class="product-rating">
                {/* <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i> */}
                <Rate disabled allowHalf value={productDetail.rating} />
                <span>{productDetail.rating}({productDetail.noOfRatings})</span>
              </div>

              {productDetail.discount > 0 ? <div class="product-price">
                <p class="last-price">
                  Old Price: <span>$ {productDetail.price}</span>
                </p>
                <p class="new-price">
                  New Price: <span>{productDetail.price - (productDetail.price * productDetail.discount) / 100} ({productDetail.discount}%)</span>
                </p>
              </div> : 
              <div class="product-price">
                <p class="new-price">
                  Price: <span>$249.00</span>
                </p>
              </div>}

              <div class="product-detail">
                <h2>about this item: </h2>
                <p>{productDetail.description}</p>
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur, perferendis eius. Dignissimos, labore suscipit.
                  Unde.
                </p> */}
                <ul>
                  <li>
                    Color: <span>Black</span>
                  </li>
                  <li>
                    Available: <span>in stock</span>
                  </li>
                  <li>
                    Category: <span>Shoes</span>
                  </li>
                  <li>
                    Shipping Area: <span>All over the world</span>
                  </li>
                  <li>
                    Shipping Fee: <span>Free</span>
                  </li>
                </ul>
              </div>

              <div class="purchase-info">
                {/* <input type="number" min="0" value="1" /> */}
                <button
                  type="button"
                  class="btn"
                  onClick={() => {
                    const { _id, name, price, createdBy } = productDetail;
                    const img = productDetail.productPictures[0].avatar;
                    dispatch(addToCart({ _id, name, price, img, createdBy }));
                    // props.history.push(`/cart`);
                  }}
                >
                  Add to Cart <i class="fas fa-shopping-cart"></i>
                </button>
                {/* <button type="button" class="btn">
                  Compare
                </button> */}
              </div>

              <div class="social-links">
                <p>Share At: </p>
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a href="#">
                  <i class="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div class="card-wrapper" style={{ display: "block", padding: "0px" }}>
        <div cursor="unset" class="Box-sc-15jsbqj-0 eNVYxU">
          <div cursor="unset" class="Box-sc-15jsbqj-0 gEaYFE">
            {productRatings.length > 0
              ? productRatings.map((data) => {
                  // console.log(data)
                  return (
                    <div cursor="unset" class="Box-sc-15jsbqj-0 dplvjA">
                      <div
                        cursor="unset"
                        class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 fOzgOq IyJHd"
                      >
                        {/* <div
                          size="48"
                          class="AvatarStyle__StyledAvatar-sc-1tfjtzs-0 eqqGxD"
                        > */}
                          {/* <img src="/assets/images/faces/7.png" alt="avatar" /> */}
                          <div className="review-image-text">
                            <h2 style={{ fontSize: "25px",marginBottom: "0px" }}>
                              {data.createdBy.firstName.split(" ").map((item, index) => {
                                return item.charAt(0);
                              })}
                            </h2>
                          </div>
                        {/* </div> */}
                        <div cursor="unset" class="Box-sc-15jsbqj-0 ddxbe">
                          <h5
                            font-weight="600"
                            font-size="16px"
                            class="Typography-sc-1nbqu5-0 cpxBS"
                          >
                            {data.createdBy.firstName} {data.createdBy.lastName}
                          </h5>
                          <div
                            cursor="unset"
                            class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 dNNxsU hccqyr"
                          >
                            <div
                              color="warn"
                              value="4.7"
                              class="RatingStyle__StyledRating-sc-1e4cply-0 gCOMYr"
                            >
                              <Rate disabled allowHalf value={data.rating} />
                              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="url(#star-0.13194490620198907)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.13194490620198907">
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
                                fill="url(#star-0.7819957290927404)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.7819957290927404">
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
                                fill="url(#star-0.8573813673771713)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.8573813673771713">
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
                                fill="url(#star-0.15474405363921195)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.15474405363921195">
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
                                fill="url(#star-0.04921411744933524)"
                                stroke="#FFCD4E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star"
                              >
                                <defs>
                                  <linearGradient id="star-0.04921411744933524">
                                    <stop
                                      offset="0.7000000000000002"
                                      stop-color="#FFCD4E"
                                    ></stop>
                                    <stop
                                      offset="0.7000000000000002"
                                      stop-color="#FFFFFF"
                                      stop-opacity="1"
                                    ></stop>
                                  </linearGradient>
                                </defs>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg> */}
                            </div>
                            <h6
                              font-weight="600"
                              font-size="14px"
                              class="Typography-sc-1nbqu5-0 kxhGXz"
                            >
                              {data.rating}
                            </h6>
                            <span
                              font-size="14px"
                              color="text.muted"
                              class="Typography-sc-1nbqu5-0 hSikqI"
                            >
                              1.1 years ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <p color="gray.700" class="Typography-sc-1nbqu5-0 eDyJXs">
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Varius massa id ut mattis. Facilisis vitae gravida
                        egestas ac account. */}
                        {data.coment}
                      </p>
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
