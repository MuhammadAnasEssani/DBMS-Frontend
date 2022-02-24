import React from "react";
import NoImage from "../../images/No-image.jpg";
import { AiOutlinePlusCircle,AiOutlineMinusCircle  } from "react-icons/ai";
export default function ShopCard(props) {
  const { name, price ,quantity,col } = props;
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n-1) + '..' : string
  }
  return (
    <div
      // {card != null && id="ShopCard" }
      // id="ShopCard"
      id="withOutCard"
      className="shopCard"

      // style={{width: "410px"}}
    >
      <div
        className="align-items-center align-self-center"
        style={{ display: "flex" }}
      >
        <div className="col-lg-5 col-5">
        <img src={NoImage} style={{width: "100px",margin :"0px 10px 0px 10px",borderRadius: "15px" }} />
        </div>
        {/* <div className="col-lg-6" className="category_container_categories" >
          <h1 >{count}</h1>
        </div> */}
        <div className="col-lg-5 col-5" style={{ marginLeft: "10px",padding: "0px 2px 0px 2px", marginRight: "10px" }}>
          <h1 style={{ fontSize: 14 ,fontWeight: "600"}}>{name}</h1>
          <div style={{color: "rgb(125, 135, 156)"}}><span >{`${price} x ${quantity}`}</span></div>
          <div style={{color: "rgb(125, 135, 156)"}}>{price*quantity}</div>
          {/* <h1 style={{ fontSize: 20 }}>{heading}</h1> */}
        </div>
        <div className="col-lg-2 col-2">
          <AiOutlinePlusCircle style={{fontSize: "24px",cursor: "pointer"}}/>
          <div style={{paddingLeft: '8px'}}>{quantity}</div>
          <AiOutlineMinusCircle style={{fontSize: "24px",cursor: "pointer"}}/>
        </div>
      </div>
    </div>
  );
}