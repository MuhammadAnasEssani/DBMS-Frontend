import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { unSetUser } from "../../store/actions/AuthAction";
import Notification from "../../component/notification/Notification";
import { unSetDrawerState } from "../../store/actions/DrawerState";
import { BaseUrl } from "../../config/api/_Domain";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
  },
];

export default function AdminNav() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const data = useParams();
  const pathname = window.location.pathname;
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);
  useEffect(() => {
    const pathName = window.location.pathname;
    const categoryLinkHome = document.getElementById("1");
    const categoryLink = document.getElementById("2");
    const categoryLinkSignUp = document.getElementById("11");
    const categoryLinkSignIn = document.getElementById("7");
    const categoryLinkAbout = document.getElementById("3");
    const categoryLinkChangePassword = document.getElementById("8");
    const categoryLinkEditProfile = document.getElementById("9");
    // console.log(categoryLinkChangePassword)
    // const categoryLinkEditProfile = document.getElementById("9")
    {
      pathName.split("=")[0] == "/categoriesquery" && categoryLink.click();
    }
    {
      pathName == "/signup" && categoryLinkSignUp.click();
    }
    {
      pathName == "/signin" && categoryLinkSignIn.click();
    }
    {
      pathName == "/aboutus" && categoryLinkAbout.click();
    }
    {
      pathName == "/" && categoryLinkHome.click();
    }
    {
      pathName == "/change-password" &&
        authState.Token != null &&
        categoryLinkChangePassword.click();
    }
    {
      pathName == "/edit-profile" &&
        authState.Token != null &&
        categoryLinkEditProfile.click();
    }
  }, [data]);
  useEffect(() => {
    const categoryLink = document.getElementById("1");
    {
      pathname == "/" && categoryLink.click();
    }
  }, [pathname]);
  const iconsSize = 18;
  const subMenuIconSize = 14;
  const { SubMenu } = Menu;

  const [collapse, setcollapse] = useState(false);

  const rootSubmenuKeys = ["Staff", "Writers"];
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const setDrawer = () => {
    {
      window.innerWidth <= 765 && dispatch(unSetDrawerState());
    }
  };
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={[""]}
      mode="inline"
      inlineCollapsed={collapse}
      style={{
        padding: `${
          t("lang") == "ar" ? "0px 10px 0px 0px" : "0px 0px 0px 10px"
        }`,
      }}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      <Menu.Item
        key="1"
        id="1"
        style={{
          padding: "0px 24px 0px 24px",
          borderRadius: `${
            t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
          }`,
        }}
      >
        <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
        <b
          className={
            t("lang") == "ar" ? `second_border_left` : `second_border_right`
          }
        ></b>
        <Link to="/" onClick={setDrawer}>
          {t("sidebar.home")}
        </Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        id="2"
        style={{
          padding: "0px 24px 0px 24px",
          borderRadius: `${
            t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
          }`,
        }}
      >
        <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
        <b
          className={
            t("lang") == "ar" ? `second_border_left` : `second_border_right`
          }
        ></b>
        <Link to="/categoriesquery=" onClick={setDrawer}>
          {t("sidebar.categories")}
        </Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        id="3"
        style={{
          padding: "0px 24px 0px 24px",
          borderRadius: `${
            t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
          }`,
        }}
      >
        <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
        <b
          className={
            t("lang") == "ar" ? `second_border_left` : `second_border_right`
          }
        ></b>
        <Link to="/aboutus" onClick={setDrawer}>
          {t("sidebar.about")}
        </Link>
      </Menu.Item>
      {/* <Menu.Item
        key="4"
        id="4"
        style={{
          padding: "0px 24px 0px 24px",
          borderRadius: `${
            t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
          }`,
        }}
      >
        <b className={t("lang") == "ar" ? `border_left`: `border_right`}></b>
        <b className={t("lang") == "ar" ? `second_border_left`: `second_border_right`}></b>
        <Link to="/privacy" onClick={setDrawer}>{t("sidebar.privacy")}</Link>
      </Menu.Item> */}
      <SubMenu key="Languages" title={t("sidebar.languages.language")}>
        <Menu.Item
          key="5"
          id="5"
          style={{
            zIndex: "1",
            padding: "0px 48px 0px 48px",
            borderRadius: `${
              t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
            }`,
          }}
        >
          <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
          <b
            className={
              t("lang") == "ar" ? `second_border_left` : `second_border_right`
            }
          ></b>
          <Link
            onClick={() => {
              const id = "5";
              i18next.changeLanguage("en");
              setDrawer();
              change ? setChange(false) : setChange(true);
              // handleActive(id)
            }}
          >
            {t("sidebar.languages.english")}
          </Link>
        </Menu.Item>
        <Menu.Item
          key="6"
          id="6"
          style={{
            padding: "0px 48px 0px 48px",
            borderRadius: `${
              t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
            }`,
          }}
        >
          <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
          <b
            className={
              t("lang") == "ar" ? `second_border_left` : `second_border_right`
            }
          ></b>
          <Link
            onClick={() => {
              const id = "6";
              i18next.changeLanguage("ar");
              setDrawer();
              change ? setChange(false) : setChange(true);
              // handleActive(id)
            }}
          >
            {t("sidebar.languages.arabic")}
          </Link>
        </Menu.Item>
      </SubMenu>
      {authState.Token === null && (
        <Menu.Item
          key="7"
          id="7"
          style={{
            padding: "0px 24px 0px 24px",
            borderRadius: `${
              t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
            }`,
          }}
        >
          <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
          <b
            className={
              t("lang") == "ar" ? `second_border_left` : `second_border_right`
            }
          ></b>
          <Link to="/signin" onClick={setDrawer}>
            {t("sidebar.signin")}
          </Link>
        </Menu.Item>
      )}
      {authState.Token != null && (
        <Menu.Item
          id="8"
          key="8"
          style={{
            padding: "0px 24px 0px 24px",
            borderRadius: `${
              t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
            }`,
          }}
        >
          <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
          <b
            className={
              t("lang") == "ar" ? `second_border_left` : `second_border_right`
            }
          ></b>
          <Link to="/change-password">{t("changePassword")}</Link>
        </Menu.Item>
      )}
      {authState.Token != null && (
        <Menu.Item
          id="9"
          key="9"
          style={{
            padding: "0px 24px 0px 24px",
            borderRadius: `${
              t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
            }`,
          }}
        >
          <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
          <b
            className={
              t("lang") == "ar" ? `second_border_left` : `second_border_right`
            }
          ></b>
          <Link to="/edit-profile">{t("editProfile")}</Link>
        </Menu.Item>
      )}
      {authState.Token != null && (
        <Menu.Item
          key="10"
          style={{
            padding: "0px 24px 0px 24px",
            borderRadius: `${
              t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
            }`,
          }}
        >
          <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
          <b
            className={
              t("lang") == "ar" ? `second_border_left` : `second_border_right`
            }
          ></b>
          <Link
            onClick={() => {
              dispatch(unSetUser());
              Notification(
                t("sidebar.logout"),
                t("logoutSuccessfully"),
                "Success"
              );
              setDrawer();
            }}
          >
            {t("sidebar.logout")}
          </Link>
        </Menu.Item>
      )}
      {authState.Token === null && (
        <Menu.Item
          key="11"
          id="11"
          style={{
            padding: "0px 24px 0px 24px",
            borderRadius: `${
              t("lang") == "ar" ? "0px 100px 100px 0px" : "100px 0px 0px 100px"
            }`,
          }}
        >
          <b className={t("lang") == "ar" ? `border_left` : `border_right`}></b>
          <b
            className={
              t("lang") == "ar" ? `second_border_left` : `second_border_right`
            }
          ></b>
          <Link to="/signup" onClick={setDrawer}>
            {t("signUp")}
          </Link>
        </Menu.Item>
      )}
      <a
        className="btn btn-get-started margin"
        href={
          t("lang") == "en"
            ? "assets/file/User's Guide.pdf"
            : "assets/file/دليل المستخدم.pdf"
        }
        style={t("lang") == "en" ? null : { marginLeft: "30%" }}
        download
      >
        {t("UserManual")}
      </a>
    </Menu>
  );
}
