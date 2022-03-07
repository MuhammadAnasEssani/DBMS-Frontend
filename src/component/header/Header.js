import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";
import Notification from "../../component/notification/Notification";
import { useParams } from "react-router";
import { Modal } from "antd";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdDashboardCustomize, MdKeyboardArrowDown } from "react-icons/md";
import LOGO from "../../images/logo.png";
import icon from "../../images/Group 16.png";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Form, Spin, Space } from "antd";

import $ from "jquery";

import MenuHeader from "../MenuHeader/MenuHeader";
import Cart from "../Cart/Cart";
import { LoadingOutlined } from "@ant-design/icons";
import { authConstants } from "../../store/actions/contants";
import { userSignin, userSignup } from "../../config/api/auth";
import { getCategories } from "../../config/api/categories";

export default function Header(props) {
  const { lang } = props;
  const { t } = useTranslation();
  const { search } = useParams();
  var title = "Admin";
  const state = useSelector((state) => state);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Searchvalue, setValue] = useState("");
  const [authVisible, setAuthVisible] = useState("");
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const pathName = window.location.pathname
  const [filter, setFilter] = useState(false)
  const [categories, setCategories] = useState([]);
  const { SubMenu } = Menu;
  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      if (res.status == 200) {
        setCategories(res.data.categoryList)
        return
      } else {
        Notification("Categories", "Something went wrong", "Error");
        return
      }
    } catch (err) {
      Notification("Categories", "Something went wrong", "Error");
    }
    // console.log(res)
  }
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        category.children.length > 0 ? (
          <SubMenu key={category.id} title={category.name}>
            {renderCategories(category.children)}
          </SubMenu>
        ) : (
          <Menu.Item key={category.id}>{category.name}</Menu.Item>
        )
      );
    }
    return myCategories;
  };

  const removeStyle = () => {
    setTimeout(() => {
      $(".body").removeAttr("Style");
    });
  };
  const onClose = () => {
    setVisible(false);
    removeStyle();
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = { firstName, lastName, email, password, cpassword };
      const res = await userSignup(user);
      if (res.status === 201) {
        Notification("Signup", res.data.message, "Success");
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setCPassword("");
        setAuthVisible(false);
        return;
      } else {
        Notification("Signup", res.data.message, "Error");
        setLoading(false);
        return;
      }
    } catch (err) {
      Notification("Signup", "Something went wrong", "Error");
      setLoading(false);
    }
  };
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const users = {
        email,
        password,
      };
      const res = await userSignin(users);
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCESS,
          payload: {
            token,
            user,
          },
        });
        Notification("Login", res.data.message, "Success");
        setLoading(false);
        setEmail("");
        setPassword("");
        setAuthVisible(false);
        return;
      } else {
        Notification("Login", res.data.message, "Error");
        setLoading(false);
        return;
      }
    } catch {
      setLoading(false);
      Notification("Login", "Something went wrong", "Error");
    }
  };
  const logout = () => {
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    Notification("Logout", "Logout Successfully", "Success");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <span
        // onClick={() => {
        //   setSearchKey("Category");
        // }}
        >
          {t("Category")}
        </span>
      </Menu.Item>
    </Menu>
  );
  // const onKeyUp = (e) => {
  //   if (e.charCode === 13) {
  //     e.preventDefault();
  //     history.push(`/search=${Searchvalue}&filterBy=${SearchKey}`);
  //   }
  // };

  useEffect(() => {
    { (pathName == "/checkout" || pathName.split("/")[1] == "invoice" || pathName == "/account/orders") && !auth.authenticate && setAuthVisible(true) }
    // {pathName.split("/")[1] == "invoice"}
    removeStyle();
    getAllCategories()
  }, [removeStyle(), pathName, auth.authenticate]);
  console.log(categories)
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className={
            filter
              ? "col-xl-3 col-lg-3 col-md-3 col-12 mobile-categories filter-sidebar"
              : "col-xl-3 col-lg-3 col-md-3 col-12 mobile-categories filter"
          }
        >
          <div className="side-bar" style={{ height: "auto", maxHEight: "80vh" }}>
            <Menu mode="inline" >
              {categories.length > 0 &&
                renderCategories(categories)}
            </Menu>
          </div>
        </div>
      </div>
      <Modal
        title="Login"
        centered
        visible={authVisible}
        onCancel={() => {
          { (pathName == "/checkout" || pathName.split("/")[1] == "invoice") ? auth.authenticate && setAuthVisible(false) : setAuthVisible(false) }
        }}
        width={400}
      >
        <div className="col-lg-12">
          <form onSubmit={signup ? handleSignup : handleSignin}>
            <div className="col-lg-12">
              <div className="row">
              {signup && <div className="col-lg-6">
                <label className="labeltext">First Name</label>
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="FormInput"
                  style={{ borderRadius: "10px" }}
                />
              </div>}
              {signup && <div className="col-lg-6">
                <label className="labeltext">Last Name</label>
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="FormInput"
                  style={{ borderRadius: "10px" }}
                />
              </div>}
              </div>
              <div className="col-lg-12">
                <label className="labeltext">Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@yahoo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="FormInput"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="col-lg-12">
                <label className="labeltext">Password</label>
                <input
                  required
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="FormInput"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              {signup &&<div className="col-lg-12">
                <label className="labeltext">Confirm Password</label>
                <input
                  required
                  type="password"
                  placeholder="*********"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  className="FormInput"
                  style={{ borderRadius: "10px" }}
                />
              </div>}
              <div
                className="col-lg-12 row"
                style={{
                  margin: "0px",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  // to="/forgot-password"
                  className="col-lg-5 col-12"
                  style={{
                    textDecoration: "underline",
                    color: "#333",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Forgot password
                </Link>
                <a
                  // target="_blank"
                  // href="https://portal.uaqbusiness.com/Account/Login?ReturnUrl=%2F"
                  className="col-lg-7 col-12"
                  style={{
                    textDecoration: "underline",
                    color: "#333",
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "end",
                  }}
                >
                  Become a seller
                </a>
              </div>
              <div className="col-lg-12 text-center">
                {/* <Form.Item> */}
                {loading ? (
                  <button
                    style={{ border: "none" }}
                    type="submit"
                    id="buttonHover"
                    className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      padding: "15px 40px",
                    }}
                  >
                    <>
                      <Spin indicator={antIcon} />
                    </>
                  </button>
                ) : (
                  <button
                    style={{ border: "none" }}
                    type="submit"
                    id="buttonHover"
                    className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      padding: "15px 40px",
                    }}
                  // onClick={handleSignin}
                  >
                    {t("lang") == "ar" ? (
                      <>
                        <span>Signin</span>
                        <i className="bi bi-arrow-left arrow_left"></i>
                      </>
                    ) : (
                      <>
                        <span>Signin</span>
                        <i className="bi bi-arrow-right arrow_right"></i>
                      </>
                    )}
                  </button>
                )}
                {/* </Form.Item> */}
              </div>
              {signup ? <div className="col-lg-12">
                <p className="mt-5 text-center">
                  Already have an account
                  <span
                    // target="_blank"
                    // href="https://portal.uaqbusiness.com/en-US/Account/Register"
                    // to="/signup"
                    className=""
                    style={{
                      color: "#333",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "rgb(125, 135, 156)",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setSignup(false)
                    }}
                  >
                    &nbsp;Signin Now
                  </span>
                </p>
              </div> : <div className="col-lg-12">
                <p className="mt-5 text-center">
                  Dont have an account?
                  <span
                    // target="_blank"
                    // href="https://portal.uaqbusiness.com/en-US/Account/Register"
                    // to="/signup"
                    className=""
                    style={{
                      color: "#333",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "rgb(125, 135, 156)",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setSignup(true)
                    }}
                  >
                    &nbsp;Signup Now
                  </span>
                </p>
              </div>}
              
            </div>
          </form>
        </div>
      </Modal>
      <header id="header" className="header fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center">
            <div className="logo">
              <Link to="/">
                <img src={LOGO} alt="" />
              </Link>
            </div>
            <div className="categories-header-alignment">
              <MdDashboardCustomize className="category-header-icon" />
              <div>
                <h3 className="categories-header">Categories</h3>
              </div>
              <MdKeyboardArrowDown className="category-header-icon" />
              <MenuHeader />
            </div>
            <div className="categories-header-mobile" onClick={() => {
              filter ? setFilter(false) : setFilter(true)
            }}>
              <MdDashboardCustomize className="category-header-icon" />
              <MdKeyboardArrowDown className="category-header-icon" />
            </div>
          </div>

          <Drawer placement="right" onClose={onClose} visible={visible}>
            {/* <AdminNav /> */}
            <Cart />
          </Drawer>

          <nav id="navbar" className="navbar">
            <ul>
              <li className="search_container">
                <div className="header-search">
                  <div className="search-bar">
                    <form action="">
                      <input
                        type="search"
                        name=""
                        id="header-search-bar"
                        placeholder={t("search")}
                        value={Searchvalue}
                        onChange={(e) => setValue(e.target.value)}
                        style={{
                          padding: `${t("lang") == "en"
                            ? "0px 40px 0px 10px"
                            : "0px 10px 0px 40px"
                            }`,
                        }}
                      // onKeyPress={onKeyUp}
                      />
                      <span
                        style={{
                          right: `${t("lang") == "en" ? "8%" : "-8%"}`,
                        }}
                      >
                        {/* <Link to={`/search/query=${Searchvalue}`} > */}
                        <AiOutlineSearch
                        // onClick={() => {
                        //   history.push(
                        //     `/search=${Searchvalue}&filterBy=${SearchKey}`
                        //   );
                        // }}
                        />
                        {/* </Link> */}
                      </span>
                      <Dropdown overlay={menu} placement="bottomLeft">
                        <div
                          className="header-catorgies-icon"
                          style={{ cursor: "pointer" }}
                        >
                          <span className="dropdownFilter">
                            <img src={icon} alt="" />
                          </span>
                        </div>
                      </Dropdown>
                    </form>
                  </div>
                </div>
              </li>
              <li></li>
            </ul>
          </nav>

          <div className="header-icons">
            {auth.token != null ? (
              <div className="header-icon" onClick={logout}>
                <RiLogoutCircleLine />
              </div>
            ) : (
              <div
                className="header-icon"
                onClick={() => {
                  authVisible ? pathName == "/checkout" ? auth.authenticate && setAuthVisible(false) : setAuthVisible(false) : setAuthVisible(true);
                }}
              >
                <AiOutlineUser />
              </div>
            )}
            <div
              className="header-icon"
              onClick={() => {

                visible ? setVisible(false) : setVisible(true);
              }}
              style={{ position: "relative" }}
            >
              <IoBagCheckOutline />
              <div
                cursor="unset"
                class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 dlowzc iDDLYe"
              >
                <span
                  font-size="10px"
                  color="white"
                  font-weight="600"
                  class="Typography-sc-1nbqu5-0 YnhBG"
                >
                  {Object.keys(cart.cartItems).reduce((count, key) => {
                    return count + 1;
                  }, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
