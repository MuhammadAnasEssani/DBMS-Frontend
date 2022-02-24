import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import icon from "../../images/Group 16.png";
import { Menu, Dropdown, Button, Space } from "antd";
export default function SearchBar() {
  const { t } = useTranslation();
  const history = useHistory();
  const [Searchvalue, setValue] = useState("");
  const [SearchKey, setSearchKey] = useState("Shop Name");
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
  return (
    <div className="search" style={{ margin: "18px 0px 25px 0px" }}>
      <div className="header-search">
        <div className="search-bar">
          <form action="">
            <input
              type="search"
              name=""
              id="header-search-bar"
              placeholder={t("search")}
              onChange={(e) => setValue(e.target.value)}
            />
            <span
              style={{
                right: `${t("lang") == "en" ? "10%" : "-10%"}`,
              }}
            >
              {/* <Link to={`/search/query=${Searchvalue}`} > */}
              <AiOutlineSearch
                onClick={() => {
                  history.push(`/search=${Searchvalue}&filterBy=${SearchKey}`);
                }}
              />
              {/* </Link> */}
            </span>
            <Dropdown overlay={menu} placement="bottomLeft">
              <div className="header-catorgies-icon">
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
                </span>
              </div>
            </Dropdown>
          </form>
        </div>
      </div>
    </div>
  );
}
