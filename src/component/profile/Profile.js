import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BiMap, BiCategory } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { AiOutlineClockCircle, AiOutlineInstagram } from "react-icons/ai";
import { FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { getShopDetailById, reviewReply } from "../../config/api/shops";
import { Rate, Skeleton, Image } from "antd";
import { RiStarSFill } from "react-icons/ri";
import Notification from "../../component/notification/Notification";
import { BaseUrl } from "../../config/api/_Domain";
import SearchBar from "../Search_Bar/SearchBar";
import NoImage from "../../images/No-image.jpg";
import NoImageArabic from "../../images/No-image-arabic.jpg";

export default function Profile() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;
  const { t } = useTranslation();
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const [isloading, setisloading] = useState(true);
  const [currentValue, setCurrentValue] = useState(2.5);
  const [coment, setComent] = useState("");
  const [shopImageId, setShopImageId] = useState("");
  const [viewReply, setViewReply] = useState(true);
  const [visible, setVisible] = useState(false);
  const loaderArray = [1, 2, 3, 4, 5];
  const handleFetch = async (id) => {
    try {
      var res = await getShopDetailById(id);
      if (!res.Success) {
        Notification(t("profile"), t("someThing"), "Error");
        return;
      }
      setProfile(res.Data);
      setisloading(false);
    } catch (error) {
      Notification(t("profile"), t("someThing"), "Error");
    }
  };
  const handleAddReviewReply = async (shopReviewId, removeId) => {
    try {
      const data = {
        shopReviewId: shopReviewId,
        shopId: profile.Id,
        coment: coment,
      };
      var res = await reviewReply(authState.Token, data);
      if (!res.Success) {
        Notification(t("profile"), t("someThing"), "Error");
        return;
      }
      document.getElementById(removeId).value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch(id);
    // console.log(profile.ShopReviews[0].Comment.length)
  }, []);
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container-fluid">
        <div
          className={
            t("lang") === "en"
              ? drawerState.Drawer
                ? "row offset-2"
                : "row offset-xl-1"
              : drawerState.Drawer
              ? "row onset-2"
              : "row onset-xl-1"
          }
          style={{ padding: "0px 10px" }}
        >
          <SearchBar />
          <div className="col-lg-12 col-12">
            <h1 className="category_header">
              {isloading ? (
                <Skeleton.Input
                  style={{ width: 130, height: 30 }}
                  active={true}
                />
              ) : t("lang") == "en" ? (
                profile.ShopName
              ) : (
                profile.ShopArabic
              )}
            </h1>

            <div className="row profile_header">
              <div className="col-xl-12 col-lg-12 col-md-12 col 12">
                <div className="row">
                  <div className="profile_image_container col-xl-2 col-lg-2 col-md-12 col-12">
                    {isloading ? (
                      <Skeleton.Input
                        style={{
                          borderRadius: "50%",
                          width: "130px",
                          height: "124px",
                        }}
                        active={true}
                      />
                    ) : t("lang") == "ar" ? (
                      <img
                        src={
                          profile.ImagePath == ""
                            ? NoImageArabic
                            : `${BaseUrl}${profile.ImagePath}`
                        }
                        className="profile_image"
                      />
                    ) : (
                      <img
                        src={
                          profile.ImagePath == ""
                            ? NoImage
                            : `${BaseUrl}${profile.ImagePath}`
                        }
                        className="profile_image"
                      />
                    )}
                  </div>
                  <div
                    className="col-xl-5 col-lg-6 col-md-12 col-12"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <div className="row">
                      <div
                        style={{
                          Color: "#58595b",
                          fontWeight: "600",
                          marginBottom: "15px",
                        }}
                      >
                        <h3
                          className="profile_title"
                          style={{ display: "inline" }}
                        >
                          {isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 30 }}
                              active={true}
                            />
                          ) : t("lang") == "en" ? (
                            profile.ShopName
                          ) : (
                            profile.ShopArabic
                          )}
                        </h3>
                        <div style={{ display: "inline-block" }}>
                          <span
                            className="star"
                            style={{
                              alignSelf: "end",
                              marginLeft: "5px",
                              marginRight: "5px",
                            }}
                          >
                            {isloading ? (
                              <Skeleton.Input
                                style={{ width: 25, height: 20 }}
                                active={true}
                              />
                            ) : (
                              profile.ShopRating
                            )}{" "}
                            {isloading ? (
                              <Skeleton.Input
                                style={{ width: 150, height: 20 }}
                                active={true}
                              />
                            ) : (
                              <RiStarSFill
                                style={{
                                  marginBottom: "4px",
                                  color: "rgb(245, 130, 32)",
                                }}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-12">
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <div
                            className="col-lg-6 col-12"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px 0px 5px 0px",
                            }}
                          >
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "100%",
                                }}
                                active={true}
                              />
                            ) : (
                              <AiOutlineClockCircle
                                style={{
                                  width: "18px",
                                  height: "18px",
                                }}
                              />
                            )}
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 130,
                                  height: 20,
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                }}
                                active={true}
                              />
                            ) : (
                              <span className="limit-text profile_info">
                                {profile.ShopTiming}
                              </span>
                            )}
                          </div>
                          <div
                            className="col-lg-6 col-12"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px 0px 5px 0px",
                            }}
                          >
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "100%",
                                }}
                                active={true}
                              />
                            ) : (
                              <FaPhoneAlt
                                style={{
                                  width: "18px",
                                  height: "18px",
                                }}
                              />
                            )}
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 130,
                                  height: 20,
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                }}
                                active={true}
                              />
                            ) : (
                              <a
                                href={`tel:${profile.ShopContact}`}
                                style={{ color: "#000" }}
                              >
                                <span className="limit-text profile_info">
                                  {profile.ShopContact}
                                </span>
                              </a>
                            )}
                          </div>
                          <div
                            className="col-lg-6 col-12"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px 0px 5px 0px",
                            }}
                          >
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "100%",
                                }}
                                active={true}
                              />
                            ) : (
                              <HiOutlineMail
                                style={{
                                  width: "18px",
                                  height: "18px",
                                }}
                              />
                            )}
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 130,
                                  height: 20,
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                }}
                                active={true}
                              />
                            ) : (
                              <a
                                href={`mailto:${profile.ShopEmail}`}
                                style={{ color: "#000" }}
                              >
                                <span className="limit-text profile_info">
                                  {isloading ? null : profile.ShopEmail}
                                </span>
                              </a>
                            )}
                          </div>
                          <div
                            className="col-lg-6 col-12"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px 0px 5px 0px",
                            }}
                          >
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "100%",
                                }}
                                active={true}
                              />
                            ) : (
                              <BiCategory
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  marginBottom: "4px",
                                }}
                              />
                            )}
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 130,
                                  height: 20,
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                }}
                                active={true}
                              />
                            ) : (
                              <span
                                className="limit-text profile_info"
                                style={{ fontSize: "15px", marginLeft: "10px" }}
                              >
                                {isloading ? null : profile.ShopSubCategoryName}
                              </span>
                            )}
                          </div>
                          <div className="col-lg-12 col-12">
                            {isloading ? (
                              <Skeleton.Input
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "100%",
                                }}
                                active={true}
                              />
                            ) : profile.Address != null ? (
                              <BiMap
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  marginBottom: "4px",
                                }}
                              />
                            ) : null}
                            {isloading ? (
                              <>
                                <Skeleton.Input
                                  className={"para_loader"}
                                  active={true}
                                />
                                <Skeleton.Input
                                  style={{
                                    width: 320,
                                    height: 20,
                                    marginLeft: "10px",
                                  }}
                                  active={true}
                                />
                                <Skeleton.Input
                                  style={{
                                    width: 320,
                                    height: 20,
                                    marginLeft: "10px",
                                  }}
                                  active={true}
                                />
                              </>
                            ) : profile.Address != null ? (
                              <a
                                style={{ color: "#000" }}
                                target="_blank"
                                href={`https://www.google.com/maps/dir/?api=1&destination=${profile.Latitude},${profile.Longitude}&dir_action=navigate`}
                              >
                                <span className="profile_info">
                                  {isloading ? null : profile.Address}
                                </span>
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-5 col-lg-4 col-md-12 col-12"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <div
                      className="col-xl-12 col-lg-12 col-md-12 col-12"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        className="col-xl-8 col-lg-8 col-md-12 col-12"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div
                          className="col-xl-6 col-lg-6 col-md-6 col-6"
                          style={{ marginLeft: "5px" }}
                        >
                          <Link
                            to={
                              authState.Token === null
                                ? "/signin"
                                : `/feedback/${isloading ? null : profile.Id}`
                            }
                          >
                            {isloading ? (
                              <Skeleton.Input
                                className={"button_loader"}
                                active={true}
                              />
                            ) : (
                              <button
                                className="btn btn-get-started marignR"
                                style={{
                                  fontSize: "11px",
                                  border: "none",
                                  padding: "13px 0px",
                                  width: "96%",
                                }}
                              >
                                {t("giveFeedback")}
                              </button>
                            )}
                          </Link>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                          {
                            isloading ? (
                              <Skeleton.Input
                                className={"button_loader"}
                                active={true}
                              />
                            ) : profile.Latitude != 0 &&
                              profile.Longitude != 0 ? (
                              <a
                                target="_blank"
                                href={`https://www.google.com/maps/dir/?api=1&destination=${profile.Latitude},${profile.Longitude}&dir_action=navigate`}
                              >
                                <button
                                  className="btn btn-get-started marginP"
                                  style={{
                                    fontSize: "11px",
                                    border: "none",
                                    padding: "13px 0px",
                                    width: "96%",
                                  }}
                                >
                                  {t("direction")}
                                </button>
                              </a>
                            ) : (
                              <a target="_blank" href={profile.GoogleLink}>
                                <button
                                  // onClick={() => {
                                  //   Notification(
                                  //     t("profile"),
                                  //     t("shopHasNo"),
                                  //     "Success"
                                  //   );
                                  // }}
                                  className="btn btn-get-started marginP"
                                  style={{
                                    fontSize: "11px",
                                    border: "none",
                                    padding: "13px 0px",
                                    width: "96%",
                                  }}
                                >
                                  {t("direction")}
                                </button>
                              </a>
                            )
                            // <a
                            //   target="_blank"
                            //   href={`https://www.google.com/maps/dir/?api=1&destination=${profile.Latitude},${profile.Longitude}&dir_action=navigate`}
                            // >
                            //   <button
                            //     className="btn btn-get-started marginP"
                            //     style={{
                            //       fontSize: "11px",
                            //       border: "none",
                            //       padding: "13px 0px",
                            //       width: "96%",
                            //     }}
                            //   >
                            //     {t("direction")}
                            //   </button>
                            // </a>
                          }
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-12 col-12 profile_icons">
                        {isloading ? (
                          <Skeleton.Input
                            style={{
                              marginTop: "30px",
                              width: 45,
                              height: 41,
                              borderRadius: "100%",
                            }}
                            active={true}
                          />
                        ) : (
                          <div className="facebooks">
                            <a
                              target="_blank"
                              style={{ color: "black" }}
                              href={profile.FacebookLink}
                            >
                              <FaFacebookF
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                          </div>
                        )}
                        {isloading ? (
                          <Skeleton.Input
                            style={{
                              marginTop: "30px",
                              width: 45,
                              height: 41,
                              borderRadius: "100%",
                            }}
                            active={true}
                          />
                        ) : (
                          <div className="googles">
                            <a
                              target="_blank"
                              style={{ color: "black" }}
                              href={profile.GoogleLink}
                            >
                              <BiMap
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                          </div>
                        )}
                        {isloading ? (
                          <Skeleton.Input
                            style={{
                              marginTop: "30px",
                              width: 45,
                              height: 41,
                              borderRadius: "100%",
                            }}
                            active={true}
                          />
                        ) : (
                          <div className="instas">
                            <a
                              target="_blank"
                              style={{ color: "black" }}
                              href={profile.InstagramLink}
                            >
                              <GrInstagram
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            {isloading ? (
              <>
                <Skeleton.Input
                  style={{
                    margin: "10px 0px 10px 0px",
                    width: "1200px",
                    height: "20px",
                  }}
                  active={true}
                />
                <Skeleton.Input
                  style={{
                    margin: "10px 0px 10px 0px",
                    width: "1200px",
                    height: "20px",
                  }}
                  active={true}
                />
                <Skeleton.Input
                  style={{
                    margin: "10px 0px 10px 0px",
                    width: "1200px",
                    height: "20px",
                  }}
                  active={true}
                />
              </>
            ) : (
              <p className="pra">
                {isloading
                  ? null
                  : t("lang") == "en"
                  ? profile.ShopDescription
                  : profile.ShopArabicDescription}
              </p>
            )}
          </div>
          <div className="col-lg-12">
            <h1 className="category_header profile_headers">{t("gallery")}</h1>

            <div className="row ">
              {isloading ? (
                loaderArray.map((data) => {
                  return (
                    <div className="col-lg-2 col-6">
                      <Skeleton.Input
                        style={{
                          marginTop: "22%",
                          width: 140,
                          height: 115,
                        }}
                        active={true}
                      />
                    </div>
                  );
                })
              ) : profile.ShopImage.length > 0 ? (
                profile.ShopImage.map((data) => {
                  return (
                    <div className="col-lg-2 col-4 " key={data.ShopImage_Id}>
                      <>
                        <Image src={`${BaseUrl}${data.ImagePathh}`} />
                      </>
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
            <div className="line"></div>
          </div>
          <br />
          <br />

          <div className="col-lg-12">
            <h1 className="category_header profile_headers">{t("review")}</h1>
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
            ) : profile.ShopReviews.length > 0 ? (
              profile.ShopReviews.map((data) => {
                return (
                  <div className="single-review">
                    <div className="single-review__image">
                      {data.ImagePath != "" ? (
                        <img
                          src={`${BaseUrl}${data.ImagePath}`}
                          alt=""
                          className="img-fluid"
                        />
                      ) : (
                        <div className="review-image-text">
                          <h2 style={{ fontSize: "25px" }}>
                            {data.UserName.split(" ").map((item, index) => {
                              return item.charAt(0);
                            })}
                          </h2>
                        </div>
                      )}
                      {/* <img
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                        alt=""
                        className="img-fluid"
                      /> */}
                    </div>

                    <div className="single-review__content">
                      <p className="review-username">{data.UserName}</p>
                      <div className="single-review__rating">
                        <Rate
                          disabled
                          allowHalf
                          value={data.Rate}
                          style={{ fontSize: "17px" }}
                        />
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        {data.Comment.length > 200 ? (
                          visible ? (
                            <>
                              <p className="review-message">{data.Comment}</p>{" "}
                              <span
                                onClick={() => {
                                  setVisible(false);
                                }}
                                style={{ cursor: "pointer", fontWeight: "600" }}
                              >
                                {t("less")}
                              </span>
                            </>
                          ) : (
                            <>
                              <p className="review-message">
                                {data.Comment.substr(0, 500) + "..."}
                              </p>{" "}
                              <span
                                onClick={() => {
                                  setVisible(true);
                                }}
                                style={{ cursor: "pointer", fontWeight: "600" }}
                              >
                                {t("more")}
                              </span>
                            </>
                          )
                        ) : (
                          <p className="review-message">{data.Comment}</p>
                        )}
                      </div>
                      {/* <p className="review-message">{data.Comment}</p> */}
                      {data.ReviewReply.length > 0 && (
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
                      )}
                      {authState.Token != null &&
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
                        )}
                      <div id={`${data.Id}+`} className="reply">
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

                                {/* <img
                                  src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                                  alt=""
                                  className="img-fluid"
                                /> */}
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
                      </div>
                      <span
                      style={{fontWeight: "600"}}
                        id={`${data.Id}+++`}
                        className="hide"
                        onClick={() => {
                          document.getElementById(`${data.Id}+`).style.display =
                            "none";
                          document.getElementById(
                            `${data.Id}++`
                          ).style.display = "initial";
                          document.getElementById(
                            `${data.Id}+++`
                          ).style.display = "none";
                        }}
                      >
                        {t("hideReply")}
                      </span>
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
          {/* <Footer /> */}
        </div>
      </div>
    </section>
  );
}
