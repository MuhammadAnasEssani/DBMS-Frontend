import React, { useEffect, useState } from "react";
import ShopCard from "../ShopCard/ShopCard";
import { RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems, removeCartItem } from "../../store/actions";
import { Link } from "react-router-dom";
import Notification from "../../component/notification/Notification";

export default function Cart(props) {
  const { close } = props;
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
    // dispatch({ type: cartConstants.RESET_CART });
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);
  const onQuantityIncrement = (_id) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };
  const onRemoveCartItem = (_id) => {
    // console.log("Helllo")
    dispatch(removeCartItem({ productId: _id }));
  };
  return (
    <>
      <div className="col-lg-12 slider">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className="title">Cart</h1>
        </div>
        {Object.keys(cartItems).map((key, index) => (
          <div style={{ margin: "13px 0px" }}>
            <ShopCard
              name={cartItems[key].name}
              image={cartItems[key].img}
              price={cartItems[key].price}
              quantity={cartItems[key].qty}
              id={cartItems[key]._id}
              increment={onQuantityIncrement}
              decrement={onQuantityDecrement}
              remove={onRemoveCartItem}
            />
          </div>
        ))}
        <Link to={Object.keys(cart.cartItems).length != 0 && "/checkout"} onClick={() => {
          Object.keys(cart.cartItems).length != 0 && close()
        }}>
          <button color="primary" class="Button-l2616d-0 hlOtvl" >
            <div font-weight="600" class="Typography-sc-1nbqu5-0 hcjNSe">
              {`Checkout Now ($${Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
              }, 0)})`}
            </div>
          </button>
        </Link>
      </div>
    </>
  );
}
