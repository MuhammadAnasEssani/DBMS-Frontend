import React, { useEffect, useState } from "react";
import Card from "../../component/Card";
import NoImageArabic from "../../images/No-image-arabic.jpg";
import { FaFilter } from "react-icons/fa";
import { Rate, Spin } from "antd";
import { getProducts } from "../../config/api/products";
import { Link, useParams } from "react-router-dom";
import Notification from "../../component/notification/Notification";
import { Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ProductPage() {
  const shops = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(false);
  const { slug } = useParams();
  const shopLoaderArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [productLoader, setProductLoader] = useState(true);
  const [Lowest, setLowest] = useState(0);
  const [Highest, setHighest] = useState(100000000000000000000);
  const [lowestValue, setLowestValue] = useState(0);
  const [highestValue, setHighestValue] = useState(0);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [filterOnSale, setFilterOnSale] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [filterRating, setFilterRating] = useState([]);

  const getProduct = async () => {
    const model = {
      lower: Lowest,
      higher: Highest,
    };
    setProductLoader(true);
    try {
      const res = await getProducts(slug, model);
      if (res.status == 200) {
        setProducts(res.data.products);
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        for (var i = res.data.products.length - 1; i >= 0; i--) {
          tmp = res.data.products[i].price;
          if (tmp < lowest) {
            lowest = tmp;
            setLowest(tmp);
            setLowestValue(tmp);
          }
          if (tmp > highest) {
            highest = tmp;
            setHighest(tmp);
            setHighestValue(tmp);
          }
        }
        setProductLoader(false);
        return;
      } else {
        Notification("Products", "Something went wrong", "Error");
        return;
      }
    } catch (err) {
      Notification("Products", "Something went wrong", "Error");
    }
  };
  const getProductForFilter = async (e) => {
    e.preventDefault();
    const model = {
      lower: Lowest,
      higher: Highest,
    };
    const modell = {};
    if (filterOnSale) {
      modell.sale = true;
    }
    if (filterInStock) {
      modell.stock = true;
    }
    if (filterFeatured) {
      modell.feature = true;
    }
    if(filterRating.length > 0) {
      modell.rating = filterRating
    }
    setProductLoader(true);
    try {
      const res = await getProducts(slug, model,modell);
      if (res.status == 200) {
        setProducts(res.data.products);
        setProductLoader(false);
        return;
      } else {
        Notification("Products", "Something went wrong", "Error");
        return;
      }
    } catch (err) {
      Notification("Products", "Something went wrong", "Error");
    }
  };
  useEffect(() => {
    getProduct();
  }, [slug]);
  return (
    <>
      <section id="hero" className="hero d-flex">
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
                  <form onSubmit={getProductForFilter}>
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
                            onChange={(e) => {
                              setLowest(e.target.value);
                            }}
                            value={Lowest}
                            min={lowestValue}
                            max={Highest}
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
                            onChange={(e) => {
                              setHighest(e.target.value);
                            }}
                            value={Highest}
                            min={Lowest}
                            max={highestValue}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 text-center">
                      {productLoader ? (
                        <button
                          class="Button-sc-l2616d-0 bRMjZL button-link"
                          color="primary"
                          type="submit"
                          style={{ width: "100%", marginTop: "12px" }}
                        >
                          <>
                            <Spin indicator={antIcon} />
                          </>
                        </button>
                      ) : (
                        <button
                          class="Button-sc-l2616d-0 bRMjZL button-link"
                          color="primary"
                          type="submit"
                          style={{ width: "100%", marginTop: "12px" }}
                        >
                          <>
                            <span>Filter</span>
                            {/* <i className="bi bi-arrow-right arrow_right"></i> */}
                          </>
                        </button>
                      )}
                    </div>
                  {/* <div
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
                  </div> */}<div class="Divider-sc-119puxu-0 kdZOfo"></div>
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
                        checked={filterOnSale ? "checked" : null}
                        onChange={() => {
                          filterOnSale
                            ? setFilterOnSale(false)
                            : setFilterOnSale(true);
                        }}
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
                        id="0.8918393257508422"
                        checked={filterInStock ? "checked" : null}
                        onChange={() => {
                          filterOnSale
                            ? setFilterInStock(false)
                            : setFilterInStock(true);
                        }}
                      />
                      <label for="0.8918393257508422">
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
                        id="0.8918393257508423"
                        checked={filterFeatured ? "checked" : null}
                        onChange={() => {
                          filterFeatured
                            ? setFilterFeatured(false)
                            : setFilterFeatured(true);
                        }}
                      />
                      <label for="0.8918393257508423">
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
                        id="0.8918393257508424"
                        checked={
                          filterRating.filter((item) => item.rating == 5)
                            .length > 0
                            ? "checked"
                            : null
                        }
                        onChange={() => {
                          filterRating.filter((item) => item.rating == 5)
                            .length > 0
                            ? setFilterRating(
                                filterRating.filter((item) => item.rating != 5)
                              )
                            : filterRating.push({ rating: 5 });
                        }}
                      />
                      <label for="0.8918393257508424">
                        <Rate disabled allowHalf value={5} />
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
                        id="0.8918393257508425"
                        checked={
                          filterRating.filter((item) => item.rating == 4)
                            .length > 0
                            ? "checked"
                            : null
                        }
                        onChange={() => {
                          filterRating.filter((item) => item.rating == 4)
                            .length > 0
                            ? setFilterRating(
                                filterRating.filter((item) => item.rating != 4)
                              )
                            : filterRating.push({ rating: 4 });
                        }}
                      />
                      <label for="0.8918393257508425">
                        <Rate disabled allowHalf value={4} />
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
                        id="0.8918393257508426"
                        checked={
                          filterRating.filter((item) => item.rating == 3)
                            .length > 0
                            ? "checked"
                            : null
                        }
                        onChange={() => {
                          filterRating.filter((item) => item.rating == 3)
                            .length > 0
                            ? setFilterRating(
                                filterRating.filter((item) => item.rating != 3)
                              )
                            : filterRating.push({ rating: 3 });
                        }}
                      />
                      <label for="0.8918393257508426">
                        <Rate disabled allowHalf value={3} />
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
                        id="0.8918393257508427"
                        checked={
                          filterRating.filter((item) => item.rating == 2)
                            .length > 0
                            ? "checked"
                            : null
                        }
                        onChange={() => {
                          filterRating.filter((item) => item.rating == 2)
                            .length > 0
                            ? setFilterRating(
                                filterRating.filter((item) => item.rating != 2)
                              )
                            : filterRating.push({ rating: 2 });
                        }}
                      />
                      <label for="0.8918393257508427">
                        <Rate disabled allowHalf value={2} />
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
                        id="0.8918393257508428"
                        checked={
                          filterRating.filter((item) => item.rating == 1)
                            .length > 0
                            ? "checked"
                            : null
                        }
                        onChange={() => {
                          filterRating.filter((item) => item.rating == 1)
                            .length > 0
                            ? setFilterRating(
                                filterRating.filter((item) => item.rating != 1)
                              )
                            : filterRating.push({ rating: 1 });
                        }}
                      />
                      <label for="0.8918393257508428">
                        <Rate disabled allowHalf value={1} />
                      </label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-9">
                <div
                  className="row products-section"
                  // style={{
                  //   // justifyContent: "space-between",
                  //   overflow: "auto",
                  //   height: "80vh",
                  // }}
                >
                  {productLoader
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
                    : products.length > 0
                    ? products.map((data) => {
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
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
