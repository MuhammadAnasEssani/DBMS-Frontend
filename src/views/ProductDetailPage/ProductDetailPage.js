import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductDetail } from "../../config/api/products";
import Notification from "../../component/notification/Notification";
import { BsHeart } from "react-icons/bs";
import { RiStarSFill } from "react-icons/ri";
import { addToCart, addToCartFromProductDetail } from "../../store/actions";
import { useDispatch } from "react-redux";
import { getProductRatings } from "../../config/api/rating";
import { Rate, Skeleton } from "antd";
export default function ProductDetailPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [productDetailLoader, setProductDetailLoader] = useState(true);
  const [productRatings, setProductRatings] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [addToWishList, setAddToWishList] = useState(true);
  const [visible, setVisible] = useState(false);
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const loaderArray = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const getProductDetails = async () => {
    try {
      const res = await getProductDetail(productId);
      if (res.status == 200) {
        setProductDetail(res.data.product);
        setProductDetailLoader(false);
        return;
      } else {
        Notification("Product Detail", "Something went wrong", "Error");
        return;
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
        setisloading(false);
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
  const handleAddToCart = (e) => {
    e.preventDefault()
    const { _id, name, price, discount, createdBy, quantity } = productDetail;
    const img = productDetail.productPictures[0].avatar;
    dispatch(
      addToCartFromProductDetail({
        _id,
        name,
        price,
        img,
        discount,
        createdBy,
        quantity,
        colour,
        size
      })
    );
    // }}
  };
  useEffect(() => {
    getProductDetails();
    getProductRating();
  }, []);
  // console.log(productRatings);
  console.log(productDetail);
  return (
    <>
      {productDetailLoader ? (
        <div class="card-wrapper">
          <Skeleton.Input
            // style={{
            //   flexBasis: "70px",
            //   borderRadius: "50%",
            //   width: 55,
            //   height: 50,
            // }}
            className={"productDetailLoader"}
            active={true}
          />
        </div>
      ) : productDetail != "" ? (
        <div class="card-wrapper">
          <div class="card">
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
              </div>
            </div>
            <div class="product-content">
              <h2 class="product-title">{productDetail.name}</h2>
              <Link
                to={`/shop/${productDetail.createdBy._id}`}
                class="product-link"
              >
                {productDetail.createdBy.shopName}
              </Link>
              <div class="product-rating">
                <Rate disabled allowHalf value={productDetail.rating} />
                <span>
                  {productDetail.rating}({productDetail.noOfRatings})
                </span>
              </div>

              {productDetail.discount > 0 ? (
                <div class="product-price">
                  <p class="last-price">
                    Old Price: <span>$ {productDetail.price}</span>
                  </p>
                  <p class="new-price">
                    New Price:{" "}
                    <span>
                      {productDetail.price -
                        (productDetail.price * productDetail.discount) /
                          100}{" "}
                      ({productDetail.discount}%)
                    </span>
                  </p>
                </div>
              ) : (
                <div class="product-price">
                  <p class="new-price">
                    Price: <span>$249.00</span>
                  </p>
                </div>
              )}

              <div class="product-detail">
                <h2>about this item: </h2>
                <p>{productDetail.description}</p>
                <ul>
                  {productDetail.colours && (
                    <li>
                      Color:{" "}
                      {productDetail.colours.map((colour) => {
                        return (
                          <span
                            style={{
                              background: "#c5bfbf",
                              padding: "2px 7px",
                              borderRadius: "10px",
                              margin: "0px 6px 0px 0",
                            }}
                          >
                            {colour.text}
                          </span>
                        );
                      })}
                    </li>
                  )}
                  <li>
                    Available:{" "}
                    {productDetail.quantity > 0 ? (
                      <span>in stock</span>
                    ) : (
                      <span>out of stock</span>
                    )}
                  </li>
                  <li>
                    Category: <span>{productDetail.category.name}</span>
                  </li>
                  {/* <li>
                    Shipping Area: <span>All over the world</span>
                  </li>
                  <li>
                    Shipping Fee: <span>Free</span>
                  </li> */}
                </ul>
              </div>
              <form onSubmit={handleAddToCart}>
                {productDetail.colours.length > 0 && (
                  <div class="content">
                    <label>
                      Select Colour<span>*</span>
                    </label>
                    {/* <Form.Item name="payment"> */}
                    <select
                      required
                      id="state-province"
                      value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      style={{
                        width: "100%",
                        height: "45px",
                        lineHeight: "50px",
                        padding: "0px 20px",
                        color: "#333",
                        border: "none",
                        // background: "#F6F7FB",
                        margin: "15px 0px",
                      }}
                    >
                      <option value="">None</option>
                      {productDetail.colours.map((colour) => {
                        return (
                          <option key={colour.text} value={colour.text}>
                            {colour.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                {productDetail.sizes.length > 0 && (
                  <div class="content">
                    <label>
                      Select Size<span>*</span>
                    </label>
                    {/* <Form.Item name="payment"> */}
                    <select
                      required
                      id="state-province"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      style={{
                        width: "100%",
                        height: "45px",
                        lineHeight: "50px",
                        padding: "0px 20px",
                        color: "#333",
                        border: "none",
                        // background: "#F6F7FB",
                        margin: "15px 0px",
                      }}
                    >
                      <option value="">None</option>
                      {productDetail.sizes.map((size) => {
                        return (
                          <option key={size.text} value={size.text}>
                            {size.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                {productDetail.quantity > 0 && (
                  <div class="purchase-info">
                    <button
                      type="submit"
                      class="btn"
                      // onClick={() => {
                      //   const {
                      //     _id,
                      //     name,
                      //     price,
                      //     discount,
                      //     createdBy,
                      //     quantity,
                      //   } = productDetail;
                      //   const img = productDetail.productPictures[0].avatar;
                      //   dispatch(
                      //     addToCartFromProductDetail({
                      //       _id,
                      //       name,
                      //       price,
                      //       img,
                      //       discount,
                      //       createdBy,
                      //       quantity,
                      //     })
                      //   );
                      // }}
                    >
                      Add to Cart <i class="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                )}
              </form>
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
      <div
        className="card-wrapper"
        style={{ paddingTop: "0px", marginTop: "0px" }}
      >
        <div className="col-lg-12">
          <h1 className="category_header profile_headers">Reviews</h1>
          {isloading ? (
            loaderArray.map((data) => {
              return (
                <div className="single-review">
                  <div className="single-review__image">
                    <Skeleton.Input
                      style={{
                        flexBasis: "70px",
                        borderRadius: "50%",
                        width: 55,
                        height: 50,
                      }}
                      active={true}
                    />
                  </div>

                  <div className="single-review__content">
                    <p className="review-username">
                      <Skeleton.Input
                        style={{ width: 130, height: 20, margin: "1px" }}
                        active={true}
                      />
                    </p>
                    <div className="single-review__rating">
                      <Skeleton.Input
                        style={{ width: 130, height: 20, margin: "1px" }}
                        active={true}
                      />
                    </div>
                    <p className="review-message">
                      <Skeleton.Input
                        style={{ width: 1000, height: 20, margin: "1px" }}
                        active={true}
                      />
                      <Skeleton.Input
                        style={{ width: 1000, height: 20, margin: "1px" }}
                        active={true}
                      />
                      <Skeleton.Input
                        style={{ width: 1000, height: 20, margin: "1px" }}
                        active={true}
                      />
                    </p>
                  </div>
                </div>
              );
            })
          ) : productRatings.length > 0 ? (
            productRatings.map((data) => {
              return (
                <div className="single-review">
                  <div className="single-review__image">
                    {/* {data.ImagePath != "" ? (
                    <img
                      src={`${BaseUrl}${data.ImagePath}`}
                      alt=""
                      className="img-fluid"
                    />
                  ) : ( */}
                    <div className="review-image-text">
                      <h2 style={{ fontSize: "25px" }}>
                        {data.createdBy.firstName
                          .split(" ")
                          .map((item, index) => {
                            return item.charAt(0);
                          })}
                      </h2>
                    </div>
                    {/* )} */}
                    {/* <img
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                        alt=""
                        className="img-fluid"
                      /> */}
                  </div>

                  <div className="single-review__content">
                    <p className="review-username">
                      {data.createdBy.firstName} {data.createdBy.lastName}
                    </p>
                    <div className="single-review__rating">
                      <Rate
                        disabled
                        allowHalf
                        value={data.rating}
                        style={{ fontSize: "17px" }}
                      />
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      {data.coment.length > 200 ? (
                        visible ? (
                          <>
                            <p className="review-message">{data.coment}</p>{" "}
                            <span
                              onClick={() => {
                                setVisible(false);
                              }}
                              style={{ cursor: "pointer", fontWeight: "600" }}
                            >
                              {/* {t("less")} */}
                              Less
                            </span>
                          </>
                        ) : (
                          <>
                            <p className="review-message">
                              {data.coment.substr(0, 500) + "..."}
                            </p>{" "}
                            <span
                              onClick={() => {
                                setVisible(true);
                              }}
                              style={{ cursor: "pointer", fontWeight: "600" }}
                            >
                              More
                            </span>
                          </>
                        )
                      ) : (
                        <p className="review-message">{data.coment}</p>
                      )}
                    </div>
                    {/* <p className="review-message">{data.Comment}</p> */}
                    {/* {data.ReviewReply.length > 0 && (
                        <span
                          id={`${data.Id}++`}
                          style={{ cursor: "pointer", color: "#444444",fontWeight: "600" }}
                          onClick={() => {
                            document.getElementById(
                              `${data.Id}+`
                            ).style.display = "initial";
                            document.getElementById(
                              `${data.Id}++`
                            ).style.display = "none";
                            document.getElementById(
                              `${data.Id}+++`
                            ).style.display = "initial";
                          }}
                        >
                          {t("viewReply")}
                        </span>
                      )} */}
                    {/* {authState.Token != null &&
                        authState.UserId === data.UserId && (
                          <Link
                            to={
                              authState.Token === null
                                ? "/signin"
                                : `/edit-feedback/shopId=${
                                    isloading ? null : profile.Id
                                  }&reviewId=${isloading ? null : data.Id}`
                            }
                            style={{
                              color: "#444444",
                              display: "block",
                              fontWeight: "600"
                            }}
                          >
                            {t("editFeedback")}
                          </Link>
                        )} */}
                    {/* <div id={`${data.Id}+`} className="reply">
                        {data.ReviewReply.map((data) => {
                          return (
                            <div
                              className="single-review"
                              style={{
                                marginBottom: "5px",
                                paddingBottom: "5px",
                                borderBottom: "none",
                              }}
                            >
                              <div
                                className="single-review__image"
                                style={{ maxWidth: "100px" }}
                              >
                                {t("lang") == "ar" ? (
                                  <img
                                    src={
                                      profile.ImagePath == ""
                                        ? NoImageArabic
                                        : `${BaseUrl}${profile.ImagePath}`
                                    }
                                    className="img-fluid"
                                  />
                                ) : (
                                  <img
                                    src={
                                      profile.ImagePath == ""
                                        ? NoImage
                                        : `${BaseUrl}${profile.ImagePath}`
                                    }
                                    className="img-fluid"
                                  />
                                )}
                              </div>
                              <div className="single-review__content">
                                <p className="review-username">
                                  {data.UserName}
                                </p>
                                <p className="review-message">{data.Comment}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div> */}
                    {/* <span
                    style={{ fontWeight: "600" }}
                    id={`${data.Id}+++`}
                    className="hide"
                    onClick={() => {
                      document.getElementById(`${data.Id}+`).style.display =
                        "none";
                      document.getElementById(`${data.Id}++`).style.display =
                        "initial";
                      document.getElementById(`${data.Id}+++`).style.display =
                        "none";
                    }}
                  >
                    {t("hideReply")}
                  </span> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div
                className="col-xl-4 col-lg-4 col-md-4 col-10"
                style={{ margin: "auto" }}
              >
                <img
                  src="../assets/img/NO-Data-found.png"
                  alt=""
                  style={{ maxWidth: "100%" }}
                ></img>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div class="card-wrapper" style={{ display: "block", padding: "0px" }}>
        <div cursor="unset" class="Box-sc-15jsbqj-0 eNVYxU">
          <div cursor="unset" class="Box-sc-15jsbqj-0 gEaYFE">
            {productRatings.length > 0
              ? productRatings.map((data) => {
                  return (
                    <div cursor="unset" class="Box-sc-15jsbqj-0 dplvjA">
                      <div
                        cursor="unset"
                        class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 fOzgOq IyJHd"
                      >
                        
                          <div className="review-image-text">
                            <h2 style={{ fontSize: "25px",marginBottom: "0px" }}>
                              {data.createdBy.firstName.split(" ").map((item, index) => {
                                return item.charAt(0);
                              })}
                            </h2>
                          </div>
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
                        {data.coment}
                      </p>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div> */}
    </>
  );
}
