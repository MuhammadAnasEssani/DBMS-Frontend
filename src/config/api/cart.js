import axios from "../helper/axios";

function getCartItems() {
    return axios.get(`/cart-items`).then((res) => res)
}
function addToCart(model) {
    return axios.post('/cart-items', {
        ...model
    })
}

export {getCartItems,addToCart };