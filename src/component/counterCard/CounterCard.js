import React from "react";
import { useTranslation } from "react-i18next";

export default function CategoryCard(props) {
  const { icon, count, heading, col, isActive } = props;
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '..' : string
  }
  const { t } = useTranslation();
  return (
    // <div
    //   id="category_container"
    //   className={
    //     col != null
    //       ? `col-lg-${col} dashboardSections`
    //       : "col-lg-5 dashboardSections"
    //   }
    // >
    <div
      className="col-xl-12 col-lg-12 col-md-12 col-12 align-items-center align-self-center"
    // style={{ display: "flex" ,paddingLeft: "16px", paddingRight: "16px", width: "100%"}}
    >
      <div className="col-xl-12 col-lg-12 col-md-12 col-12 row category_contents" style={{ margin: "0px" }}>
        {/* <img className="DashboardImage col-xl-2 col-lg-2 col-md-2 col-2" src={icon}  style={{padding: "0px"}}/>
        <div className="category_container_categories col-xl-9 col-lg-10 col-md-10 col-10"  style={{padding: "0px"}}>
          <h1 style={isActive ? {color: "white"} : {fontWeight: 600}}>{truncate(count, 12)}</h1>
        </div> */}
        {/* {t("lang") == "ar" ? (
          <>
        <div className="category_container_categories col-xl-9 col-lg-10 col-md-10 col-10"  style={{padding: "0px"}}>
          <h1 style={isActive ? {color: "white"} : {fontWeight: 600}}>{truncate(count, 12)}</h1>
        </div>
        <img className="DashboardImage col-xl-2 col-lg-2 col-md-2 col-2" src={icon}  style={{padding: "0px"}}/>
          </>
        ) : (
          <>
          <img className="DashboardImage col-xl-2 col-lg-2 col-md-2 col-2" src={icon}  style={{padding: "0px"}}/>
        <div className="category_container_categories col-xl-9 col-lg-10 col-md-10 col-10"  style={{padding: "0px"}}>
          <h1 style={isActive ? {color: "white"} : {fontWeight: 600}}>{truncate(count, 12)}</h1>
        </div>
        </>
        )} */}
        <img className="DashboardImage col-xl-2 col-lg-2 col-md-2 col-2" src={icon}  style={{padding: "0px"}}/>
        <div className="category_container_categories col-xl-9 col-lg-10 col-md-10 col-10"  style={{padding: "0px"}}>
          <h1 style={isActive ? {color: "white"} : {fontWeight: 600}}>{truncate(count, 12)}</h1>
        </div>
      </div>
    </div>
    // </div>
  );
}
