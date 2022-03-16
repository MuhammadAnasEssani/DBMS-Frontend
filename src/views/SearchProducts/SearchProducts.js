import React, { useEffect, useState } from "react";
import Card from "../../component/Card";
import NoImageArabic from "../../images/No-image-arabic.jpg";
import { FaFilter } from "react-icons/fa";
import { Rate } from "antd";
import { getProducts, getSearchedProducts } from "../../config/api/products";
import { Link, useParams } from "react-router-dom";
import Notification from "../../component/notification/Notification";
import { Skeleton } from "antd";

export default function SearchProducts() {
  const shops = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(false);
  const [Lowest, setLowest] = useState(0);
  const [Highest, setHighest] = useState(0);
  const [lowestValue, setLowestValue] = useState(0);
  const [highestValue, setHighestValue] = useState(0);
  const { keyword } = useParams();
  const shopLoaderArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [productLoader, setProductLoader] = useState(true);

  const getProduct = async () => {
    const data = {
      keyword: keyword,
    };
    setProductLoader(true);
    try {
      const res = await getSearchedProducts(data);
      // console.log(res)
      if (res.status == 200) {
        setProducts(res.data.products);
        // if(products.l)
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        for (var i = res.data.products.length - 1; i >= 0; i--) {
          // debugger
          tmp = res.data.products[i].price;
          // console.log(tmp)
          if (tmp < lowest) {
            // console.log(tmp)
            // console.log(lowest)
            // console.log(typeof(tmp))
            lowest = tmp;
            setLowest(tmp);
            setLowestValue(tmp);
            // setLowestValue(tmp);
            // lowest = tmp
          }
          if (tmp > highest) {
            highest = tmp;
            setHighest(tmp);
            setHighestValue(tmp);
            // setHighestValue(tmp)
            // Higest = tmp
          }
          // return Lowest
          // if (tmp > highest) setHighest(tmp);
          //         console.log(lowest)
          // console.log(highest)
        }
        setProductLoader(false);
        return;
      } else {
        Notification("Search Products", res.data.message, "Error");
        return;
      }
    } catch (err) {
      Notification("Search Products", "Something went wrong", "Error");
    }
  };
  const filterLowerProducts = (lower) => {
    // const products = products.filter(item => {
    //   // const query = this.state.search.toLowerCase();

    //   return (
    //     item.price >= Lowest ||
    //     item.price <= Highest
    //   )
    // });
    
    const product =  products.filter((item) => {
        // console.log(Lowest)
        // console.log(Highest)
        // const query = this.state.search.toLowerCase();
        // console.log(item)
          return (
            item.price >= lower 
          )
        // if (item.price >= Lowest || item.price <= Highest) {
        //   return true;
        // }
        // return false;
      })
    // console.log(product)
    setProducts(product)
  };
  const filterHigherProducts = (higher) => {
    // const products = products.filter(item => {
    //   // const query = this.state.search.toLowerCase();

    //   return (
    //     item.price >= Lowest ||
    //     item.price <= Highest
    //   )
    // });
    // console.log(higher)
    
    const product =  products.filter((item) => {
        // console.log(Lowest)
        // console.log(Highest)
        // const query = this.state.search.toLowerCase();
        // console.log(item)
          return (
            item.price <= higher
          )
        // if (item.price >= Lowest || item.price <= Highest) {
        //   return true;
        // }
        // return false;
      })
    // console.log(product)
    setProducts(product)
  };
  useEffect(() => {
    // dispatch(getProductsBySlug(slug));
    getProduct();
    // console.log(products)
  }, [keyword]);
  // console.log(products);
  // console.log(lowest);
  // console.log(highest);
  // const calculateLowestPrice = () => {
  //   if(products.length > 0) {
  //     for (var i = products.length - 1; i >= 0; i--) {
  //       let tmp = products[i].price;
  //       let Lowest
  //       if (tmp < lowest) {
  //         setLowest(tmp);
  //         lowest = tmp
  //       }
  //       return Lowest
  //     }
  //   }
  // }
  // const calculateHigestPrice = () => {
  //   if(products.length > 0) {
  //     for (var i = products.length - 1; i >= 0; i--) {
  //       let tmp = products[i].price;
  //       let Higest
  //       if (tmp > lowest) {
  //         setHighest(tmp);
  //         Higest = tmp
  //       }
  //       return Higest
  //   }
  // }
  // console.log(lowest)
  // console.log(highest)
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
                  {/* {products.length > 0 ? ( */}
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
                              // filterLowerProducts(e.target.value);
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
                              // filterHigherProducts(e.target.value);
                              // filterProducts();
                            }}
                            value={Highest}
                            min={Lowest}
                            max={highestValue}
                          />
                        </div>
                      </div>
                    </div>
                  {/* ) : null} */}
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
                  className="row products-section"
                  // style={{
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
