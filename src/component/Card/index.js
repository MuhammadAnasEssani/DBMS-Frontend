import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";
export default function Card(props) {
  const { image, name, rating, id,style_id,price,slug } = props;
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n-1) + '..' : string
  }
  return (
    <div
      id = {style_id != null && style_id}
      className="market_container"

    >
      <Link to={`/${slug}/${id}/p`}>
      <div
        className="col-lg-12 align-items-center align-self-center"
      >
        <img src={image} className="shop_image"  />
        <div className="col-lg-12 shop_content" >
          <h3 className= "shop_content_title">{name}</h3>
          <div ><Rate allowHalf value={rating} /></div>
          <div style={{color: "rgb(125, 135, 156)"}}>
            $&nbsp;<span>{price}</span>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}