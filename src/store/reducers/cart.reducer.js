

import { cartConstants } from "../actions/contants";

const initState = {
    cartItems: {},
    updatingCart: false,
    error: null,
    loading: false
};

const cartReducer = (state = initState, action) => {
    switch(action.type){
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true,
                loading: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            // console.log(action.payload.cartItems)
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false,
                loading: false
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error,
                loading: false
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initState
            }
            break;
        // case cartConstants.ADD_TO_CART:
        //     state = {
        //         ...state,
        //         cartItems: action.payload.cartItems
        //     }
        //     break;
        default:
    }
    return state;
}


export default cartReducer;