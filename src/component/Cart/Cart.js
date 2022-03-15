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
  const [Error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
    // dispatch({ type: cartConstants.RESET_CART });
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
    {Object.keys(cartItems).map((key, index) => (
      cartItems[key].qty > cartItems[key].quantity ? setError(true) : setError(false)
    ))}
  }, [auth.authenticate,cart.cartItems]);
  const onQuantityIncrement = (_id,qty) => {
    // console.log(qty)
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, qty));
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
          // cartItems[key].qty > cartItems[key].quantity && setError(true),
          <div style={{ margin: "13px 0px" }}>
            <ShopCard
              name={cartItems[key].name}
              image={cartItems[key].img}
              price={cartItems[key].price}
              quantity={cartItems[key].qty}
              discount= {cartItems[key].discount}
              id={cartItems[key]._id}
              increment={onQuantityIncrement}
              decrement={onQuantityDecrement}
              remove={onRemoveCartItem}
              countInStock= {cartItems[key].quantity}
              error={cartItems[key].qty > cartItems[key].quantity ? true : false}
            />
          </div>
        ))}
        <div spacing="6" class="GridStyle__StyledGrid-sc-1r6thsr-0 jpWNT" style={{width: "100%"}}>
              <div
                cursor="unset"
                class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 iMpeuc cLWlen"
                style={{padding: "0px"}}
              >
                <h5
                  font-weight="600"
                  font-size="16px"
                  class="Typography-sc-1nbqu5-0 fVBXki"
                >
                  Total Summary
                </h5>
                <div
                  cursor="unset"
                  class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 wmShx jcxxrL"
                >
                  <div
                    font-size="14px"
                    color="text.hint"
                    class="Typography-sc-1nbqu5-0 huVebp"
                  >
                    Subtotal:
                  </div>
                  <h6
                    font-weight="600"
                    font-size="14px"
                    class="Typography-sc-1nbqu5-0 JPPAF"
                  >
                    {`$${Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { price, qty,discount } = cart.cartItems[key];
                return totalPrice + price * qty;
              }, 0)}`}
                  </h6>
                </div>
                <div
                  cursor="unset"
                  class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 wmShx jcxxrL"
                >
                  <div
                    font-size="14px"
                    color="text.hint"
                    class="Typography-sc-1nbqu5-0 huVebp"
                  >
                    Shipping fee:
                  </div>
                  <h6
                    font-weight="600"
                    font-size="14px"
                    class="Typography-sc-1nbqu5-0 JPPAF"
                  >
                    $0
                  </h6>
                </div>
                <div
                  cursor="unset"
                  class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 wmShx jcxxrL"
                >
                  <div
                    font-size="14px"
                    color="text.hint"
                    class="Typography-sc-1nbqu5-0 huVebp"
                  >
                    Discount:
                  </div>
                  <h6
                    font-weight="600"
                    font-size="14px"
                    class="Typography-sc-1nbqu5-0 JPPAF"
                  >
                    {`-$${Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { price, qty,discount } = cart.cartItems[key];
                return totalPrice + ((price * discount) / 100) * qty;
              }, 0)}`}
                  </h6>
                </div>
                <div class="Divider-sc-119puxu-0 fQOiUI"></div>
                <div
                  cursor="unset"
                  class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 ipwhLL hwmPhx"
                >
                  <h6
                    font-weight="600"
                    font-size="14px"
                    class="Typography-sc-1nbqu5-0 JPPAF"
                  >
                    Total
                  </h6>
                  <h6
                    font-weight="600"
                    font-size="14px"
                    class="Typography-sc-1nbqu5-0 JPPAF"
                  >
                    {`$${Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                // console.log(cart.cartItems)
                const { price, qty,discount } = cart.cartItems[key];
                return totalPrice + (price - (price * discount) / 100) * qty;
              }, 0)}`}
                  </h6>
                </div>
                {/* <div font-size="14px" class="Typography-sc-1nbqu5-0 gVliBE">
                Paid by Credit/Debit Card
              </div> */}
              </div>
          </div>
        <Link to={(Object.keys(cart.cartItems).length != 0 && !Error) && "/checkout"} onClick={() => {
          Error ? Notification("Cart", "Plz Check Your Cart I Think We are Somewhere Out Of Stock", "Error") : Object.keys(cart.cartItems).length != 0 && close()
        }}>
          <button color="primary" class="Button-l2616d-0 hlOtvl" >
            <div font-weight="600" class="Typography-sc-1nbqu5-0 hcjNSe">
              {`Checkout Now ($${Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                // console.log(cart.cartItems)
                const { price, qty,discount } = cart.cartItems[key];
                return totalPrice + (price - (price * discount) / 100) * qty;
              }, 0)})`}
            </div>
          </button>
        </Link>
      </div>
    </>
  );
}
