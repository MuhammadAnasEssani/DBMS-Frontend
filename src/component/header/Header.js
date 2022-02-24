import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";
import { unSetUser } from "../../store/actions/AuthAction";
import { useParams } from "react-router";
import {
  setDrawerState,
  unSetDrawerState,
} from "../../store/actions/DrawerState";
import { IoApps } from "react-icons/io5";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";
import { MdDashboardCustomize, MdKeyboardArrowDown } from "react-icons/md";
// import { AiOutlineUser } from "react-icons/ai";
import LOGO from "../../images/logo.png";
import icon from "../../images/Group 16.png";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Button, Space } from "antd";
import { Select } from "antd";

import $ from "jquery";

// imports
import AdminNav from "../menus/AdminNav";
import SearchBar from "../Search_Bar/SearchBar";
import MenuHeader from "../MenuHeader/MenuHeader";
import Cart from "../Cart/Cart";

export default function Header(props) {
  const { lang } = props;
  const { t } = useTranslation();
  const { search } = useParams();
  var title = "Admin";
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [Searchvalue, setValue] = useState("");
  const [SearchKey, setSearchKey] = useState("Shop Name");

  const removeStyle = () => {
    setTimeout(() => {
      $(".body").removeAttr("Style");
    });
  };
  const showDrawer = () => {
    setVisible(true);
    // dispatch(setDrawerState());
    removeStyle();
  };
  const onClose = () => {
    setVisible(false);
    // dispatch(unSetDrawerState());
    removeStyle();
  };
  const handleLogout = () => {
    dispatch(unSetUser());
    history.push("/");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <span
          onClick={() => {
            setSearchKey("Category");
          }}
        >
          {t("Category")}
        </span>
      </Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            setSearchKey("Description");
          }}
        >
          {t("description")}
        </span>
      </Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            setSearchKey("Shop Name");
          }}
        >
          {t("shopName")}
        </span>
      </Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            setSearchKey("Area");
          }}
        >
          {t("area")}
        </span>
      </Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            setSearchKey("City");
          }}
        >
          {t("city")}
        </span>
      </Menu.Item>
    </Menu>
  );
  const onKeyUp = (e) => {
    // e.preventDefault();
    // var searchValueChanging = Searchvalue
    // console.log(searchValueChanging)
    if (e.charCode === 13) {
      e.preventDefault();
      history.push(`/search=${Searchvalue}&filterBy=${SearchKey}`);
      // setValue("");
    }
  };

  useEffect(() => {
    removeStyle();
  }, [removeStyle()]);
  useEffect(() => {
    // console.log(searchValueChanging)
    {
      window.innerWidth <= 768 && onClose();
    }
  }, [drawerState]);
  return (
    <>
      {authState.token == null ? (
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
            </div>

            <Drawer
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              {/* <AdminNav /> */}
              <Cart/>
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
                            padding: `${
                              t("lang") == "en"
                                ? "0px 40px 0px 10px"
                                : "0px 10px 0px 40px"
                            }`,
                          }}
                          onKeyPress={onKeyUp}
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
                            <span
                              className="dropdownFilter"
                              // style={{
                              //   display: "flex",
                              //   alignItems: "center",
                              //   justifyContent: "space-between",
                              //   padding: "0px 0 18px 1px",
                              //   fontFamily: "Montserrat",
                              //   fontSize: "16px",
                              //   fontWeight: "700",
                              //   whiteSpace: "nowrap",
                              //   transition: "0.3s",
                              // }}
                            >
                              <img src={icon} alt="" />
                              {/* <BsFilter /> */}
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

            {/* <div className="user-avatar">
              <img
                id="burger"
                className="burger_menu"
                src="../assets/img/Mobile-Menu-logo.png"
                style={{ width: "50px" }}
                onClick={visible ? onClose : showDrawer}
              />

            </div> */}
            <div className="header-icons">
              <div className="header-icon">
                <AiOutlineUser />
              </div>
              <div className="header-icon" onClick={()=> {
                visible ? setVisible(false) : setVisible(true)
              }}>
                <IoBagCheckOutline />
              </div>
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
}
