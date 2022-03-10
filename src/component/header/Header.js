import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MdDashboardCustomize, MdKeyboardArrowDown } from "react-icons/md";

import MenuHeader from "../MenuHeader/MenuHeader";
import { useSelector } from "react-redux";

export default function Header(props) {
  const auth = useSelector((state) => state.auth);


  // console.log(categories)
  return (
    <>
      
      <header id="header" className="header hidden-mobile" >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center">
            <div className="categories-header-alignment">
              <MdDashboardCustomize className="category-header-icon" />
              <div>
                <h3 className="categories-header">Categories</h3>
              </div>
              <MdKeyboardArrowDown className="category-header-icon" />
              <MenuHeader />
            </div>
          </div>
          <div
            cursor="unset"
            class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 gEaYFE bNDuSn"
          >
           
              
                      
            {auth.authenticate &&<Link
              class="NavLinkStyle__StyledNavLink-sc-gtj6uy-0 iyDEFq nav-link"
              to="/account/orders"
            >
              <span
                font-size="16px"
                class="Typography-sc-1nbqu5-0 iuwOpT nav-link"
              >
              My Orders
              </span>
            </Link>}
            <Link
              class="NavLinkStyle__StyledNavLink-sc-gtj6uy-0 iyDEFq nav-link"
              to="/shops"
            >
              <span
                font-size="16px"
                class="Typography-sc-1nbqu5-0 iuwOpT nav-link"
              >
                All Shops
              </span>
            </Link>
          </div>

          {/* <Drawer placement="right" onClose={onClose} visible={visible}>
            <Cart />
          </Drawer> */}

          {/* <nav id="navbar" className="navbar">
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
                        <Link to={`/search-products/${Searchvalue}`}>
                          <AiOutlineSearch
                          />
                        </Link>
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
          </nav> */}

          {/* <div className="header-icons">
            <Dropdown overlay={userMenu} placement="bottomLeft">
              <div className="header-icon">
                <AiOutlineUser />
              </div>
            </Dropdown>
            {auth.token != null ? (
              <div className="header-icon" onClick={logout}>
                <RiLogoutCircleLine />
              </div>
            ) : (
              <div
                className="header-icon"
                onClick={() => {
                  authVisible
                    ? pathName == "/checkout"
                      ? auth.authenticate && setAuthVisible(false)
                      : setAuthVisible(false)
                    : setAuthVisible(true);
                }}
              >
                <AiOutlineLogin />
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
          </div> */}
        </div>
      </header>
    </>
  );
}
