import React from "react";
import {Link} from "react-router-dom";
import {Rate} from "antd";

export default function Card(props) {
  const {
    image,
    name,
    rating,
    id,
    style_id,
    price,
    slug,
    discount,
    noOfRatings,
  } = props;
  const getPrice = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + ".." : string;
  };
  return (
    <div id={style_id != null && style_id} className="market_container">
      <Link to={`/product-detail/${id}`}>
        <div className="col-lg-12 align-items-center align-self-center product-card">
          {(discount != 0 && discount != null) && <div
            color="primary.text"
            font-size="10px"
            font-weight="600"
            class="Chip-sc-1ovzis5-0 dErric"
        >
            {discount}% off
          </div>}
          <img src={`http://localhost:3333/uploads/product-pictures/${image}`} className="shop_image" />
          <div className="col-lg-12 shop_content">
            <h3 className="shop_content_title limit-text">{name}</h3>
            <div>
              <Rate disabled allowHalf value={rating} />
            </div>
            {/* {} */}
            {discount != 0 ? (
              <div
                cursor="unset"
                class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 gEaYFE bNDuSn"
              >
                <h4
                  font-weight="600"
                  font-size="14px"
                  color="primary.main"
                  class="Typography-sc-1nbqu5-0 iDBwHD"
                >
                  {price - (price * discount) / 100}
                </h4>
                <h4
                  font-weight="600"
                  font-size="14px"
                  color="text.muted"
                  class="Typography-sc-1nbqu5-0 gNPSJZ"
                >
                  <del>${price}</del>
                </h4>
              </div>
            ) : (
              <div
                style={{ color: "rgb(125, 135, 156)" }}
                className="product_price"
              >
                $&nbsp;<span>{price}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
