import React from "react";
import {ImCross} from "react-icons/im";
import {useSelector} from "react-redux";

export default function ShopCard(props) {
  const { name, price ,quantity,discount,image,increment,decrement,id, remove,countInStock,error } = props;
  const auth = useSelector((state) => state.auth);
  // console.log(error)
  return (
      <div
          id="withOutCard"
          className="shopCard"
          // style={error ? {background: "red"} : {background: "#fff"}}
      >
        <div
            className="align-items-center align-self-center"
            style={{ display: "flex" }}
        >
          <div className="col-lg-4 col-4 AvatarStyle__StyledAvatar-sc-1tfjtzs-0 ffSehd">

            <img src={image} alt="avatar" style={{width: "70px",height: "80px",margin :"0px 10px 0px 10px",borderRadius: "15px" }} />
          </div>
          <div className="col-lg-6 col-6" style={{ marginLeft: "10px",padding: "0px 2px 0px 2px", marginRight: "10px" }}>
            <h1 style={{ fontSize: 14 ,fontWeight: "600"}}>{name}</h1>
            <div style={{color: "rgb(125, 135, 156)"}}><span >{`${price} x ${quantity}`}</span></div>
            <div style={{color: "rgb(125, 135, 156)"}}>{price*quantity}</div>
          </div>
          <div className="col-lg-2 col-2" style={{marginTop: "10px"}}>
            {/* <AiOutlinePlusCircle style={{fontSize: "24px",cursor: "pointer"}} onClick={()=> {
            increment(id)
          }}/>
          <div style={{paddingLeft: '8px'}}>{quantity}</div>
          <AiOutlineMinusCircle style={{fontSize: "24px",cursor: "pointer"}} onClick={()=> {
          {quantity > 1 && decrement(id)}
          }}/> */}
            <select value={quantity} onChange={(e) => increment(id,e.target.value)}>
              {[...Array(countInStock).keys()].map(x =>
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
              )}
            </select>
          </div>
          {auth.authenticate &&  <div style={{position: "absolute", top: "2px", right: "23px"}}>
            <ImCross style={{cursor: "pointer"}} onClick={()=> {
              remove(id)
            }}/>
          </div>}
        </div>
        {error && <div>
          <p style={{color : "red"}}>{`We have only ${countInStock} pieces in our stock plz update your cart`}</p>
        </div>}
      </div>
  );
}