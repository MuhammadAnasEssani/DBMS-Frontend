// import { cartConstants } from "./constants";
// import store from "../store";
// import axios from "../helpers/axios";

import { store } from "..";
import axios from "../../config/helper/axios";
// import { store } from "../store";
import { cartConstants } from "./contants";
import Notification from "../../component/notification/Notification";

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.post(`/user/getCartItems`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const addToCart = (product, newQty = 1) => {
//   return async (dispatch) => {
//     const {
//       cart: { cartItems },
//       auth,
//     } = store.getState();
//     console.log(cartItems)
//     console.log(cartItems[product._id])

//     const qty = cartItems[product._id]
//       ? parseInt(cartItems[product._id].qty + newQty)
//       : 1;
//     console.log(qty)
//     cartItems[product._id] = {
//       ...product,
//       qty,
//     };
//     if (auth.authenticate) {
//       dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
//       const payload = {
//         cartItems: [
//           {
//             product: product._id,
//             quantity: qty,
//           },
//         ],
//       };
//       const res = await axios.post(`/user/cart/addtocart`, payload);
//       if (res.status === 201) {
//         dispatch(getCartItems());
//         dispatch({
//           type: cartConstants.ADD_TO_CART_SUCCESS,
//           payload: { cartItems },
//         });
//       }
//     } else {
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//       dispatch({
//         type: cartConstants.ADD_TO_CART_SUCCESS,
//         payload: { cartItems },
//       });
//     }
//   };
// };

export const addToCart = (product, newQty = 1) => {
  // console.log(product)
  // console.log(newQty)
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    const qty = cartItems[product._id]
      ? parseInt(newQty)
      : newQty;
    cartItems[product._id] = {
      ...product,
      qty,
    };

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
            productVendor: product.createdBy,
            discount: product.discount,
          },
        ],
      };
      const res = await axios.post(`/user/cart/addtocart`, payload);
      if (res.status === 201) {
        Notification("Cart", "Cart Updated Successfully", "Success");
        dispatch(getCartItems());
        return
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      Notification("Cart", "Cart Updated Successfully", "Success");
    }
    // console.log(cartItems)
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};
export const addToCartFromProductDetail = (product, newQty = 1) => {
  // console.log(product)
  // console.log(newQty)
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    if(cartItems[product._id]){
      Notification("Cart", "You Already have this item in your cart", "Success");
    }else {
      const qty = 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
            productVendor: product.createdBy,
            discount: product.discount,
          },
        ],
      };
      const res = await axios.post(`/user/cart/addtocart`, payload);
      if (res.status === 201) {
        Notification("Cart", "Product added to cart successfully", "Success");
        dispatch(getCartItems());
        return
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      Notification("Cart", "Product added to cart successfully", "Success");
    }
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });

    }
  };
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(`/user/cart/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;
    // console.log(cartItems);
    if (auth.authenticate) {
      localStorage.removeItem("cart");
      dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
              productVendor: cartItems[key].createdBy,
              discount: cartItems[key].discount,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post(`/user/cart/addtocart`, payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      }
    } else {
      // console.log("Hello")
      if (cartItems) {
        // console.log("Helloo")
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export { getCartItems };
