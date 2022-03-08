export const authConstants = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCESS: 'LOGIN_SUCESS',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE'
}

export const userConstants = {
    USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILURE: 'USER_REGISTER_FAILURE'
}

export const activationConstants = {
    USER_ACTIVATION_REQUEST: 'USER_ACTIVATION_REQUEST',
    USER_ACTIVATION_SUCCESS: 'USER_ACTIVATION_SUCCESS',
    USER_ACTIVATION_FAILURE: 'USER_ACTIVATION_FAILURE'
}

export const categoryConstants = {
    GET_ALL_CATEGORY_REQUEST: 'GET_ALL_CATEGORY_REQUEST',
    GET_ALL_CATEGORY_SUCCESS: 'GET_ALL_CATEGORY_SUCCESS',
    GET_ALL_CATEGORY_FAILURE: 'GET_ALL_CATEGORY_FAILURE'
}

export const productConstants = {
    GET_PRODUCTS_BY_SLUG_REQUEST: "GET_PRODUCTS_BY_SLUG_REQUEST",
    GET_PRODUCTS_BY_SLUG: "GET_PRODUCTS_BY_SLUG",
    GET_PRODUCTS_BY_SLUG_FAILURE: "GET_PRODUCTS_BY_SLUG_FAILURE",
    // GET_PRODUCT_PAGE_REQUEST: "GET_PRODUCT_PAGE_REQUEST",
    // GET_PRODUCT_PAGE_SUCCESS: "GET_PRODUCT_PAGE_SUCCESS",
    // GET_PRODUCT_PAGE_FAILURE: "GET_PRODUCT_PAGE_FAILURE",

    GET_PRODUCT_DETAILS_BY_ID_REQUEST: "GET_PRODUCT_DETAILS_BY_ID_REQUEST",
    GET_PRODUCT_DETAILS_BY_ID_SUCCESS: "GET_PRODUCT_DETAILS_BY_ID_SUCCESS",
    GET_PRODUCT_DETAILS_BY_ID_FAILURE: "GET_PRODUCT_DETAILS_BY_ID_FAILURE",
};

export const cartConstants = {
    ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
    ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
    ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
    RESET_CART: "RESET_CART",

    REMOVE_CART_ITEM_REQUEST: "REMOVE_CART_ITEM_REQUEST",
    REMOVE_CART_ITEM_SUCCESS: "REMOVE_CART_ITEM_SUCCESS",
    REMOVE_CART_ITEM_FAILURE: "REMOVE_CART_ITEM_FAILURE",
    ADD_TO_CART: "ADD_TO_CART"
};