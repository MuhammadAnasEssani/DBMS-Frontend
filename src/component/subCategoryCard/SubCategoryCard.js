import React from "react";

export default function SubCategoryCard(props) {
  const { icon, count, heading, col, isActive } = props;
  return (
    <div
      className={
        col != null
          ? `col-lg-${col}`
          : "col-lg-5"
      }
      style={{padding: "15px 10px 15px 10px", margin: "0px 15spx", width: "170px"}}
    >
      <div
        className="col-lg-12 align-items-center align-self-center"
        style={{
            display: "flex",
            flexDirection: "column"
        }}
      >
          <div
          style={
            isActive ? {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "115px",
              height: "100px",
              borderRadius :"50%",
              boxShadow: "1px 0px 25px -1px rgb(0 0 0 / 4%)",
              backgroundColor: "#f58220"
            } : {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "115px",
              height: "100px",
              borderRadius :"50%",
              boxShadow: "1px 0px 25px -1px rgb(0 0 0 / 4%)",
              backgroundColor: "#fff"
            }
          }><img src={icon} style={{width: "46px", height: "35px"}} /></div>
        <div className="col-lg-12" className="category_container_categories" style={{marginTop: "15px"}}>
          <h1 >{count}</h1>
          {/* <h1 style={{ fontSize: 20 }}>{heading}</h1> */}
        </div>
      </div>
    </div>
  );
}